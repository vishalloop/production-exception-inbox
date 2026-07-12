import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '@/shared/api/baseQuery'
import type { PaginatedData } from '@/shared/types/api'
import type {
  DashboardSummary,
  Exception,
  ExceptionDetail,
  ExceptionListParams,
} from '@/shared/types/exception'
import type { ExceptionStatus } from '@/shared/types/enums'

export const exceptionsApi = createApi({
  reducerPath: 'exceptionsApi',
  baseQuery,
  tagTypes: ['Exception', 'ExceptionList', 'Dashboard'],
  endpoints: (builder) => ({
    getExceptions: builder.query<PaginatedData<Exception>, ExceptionListParams | void>({
      query: (params) => ({
        // Backend mounts at /excetions (typo in server — do not "fix" on the client)
        url: '/excetions',
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 100,
          product_code: params?.product_code,
          severity: params?.severity,
          status: params?.status,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Exception' as const, id })),
              { type: 'ExceptionList' as const, id: 'LIST' },
            ]
          : [{ type: 'ExceptionList' as const, id: 'LIST' }],
    }),

    getExceptionById: builder.query<ExceptionDetail, number>({
      query: (id) => ({
        url: `/excetions/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'Exception', id }],
    }),

    getDashboardSummary: builder.query<DashboardSummary, void>({
      query: () => ({
        url: '/dashboard',
      }),
      providesTags: [{ type: 'Dashboard', id: 'SUMMARY' }],
    }),

    updateExceptionStatus: builder.mutation<
      Exception,
      { id: number; status: ExceptionStatus }
    >({
      query: ({ id, status }) => ({
        url: `/excetions/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      /**
       * Optimistic UI: flip status in list + detail caches immediately,
       * then reconcile (or roll back) when the server responds.
       * No full page reload.
       */
      async onQueryStarted({ id, status }, { dispatch, queryFulfilled, getState }) {
        const now = new Date().toISOString()

        const patchDetail = dispatch(
          exceptionsApi.util.updateQueryData('getExceptionById', id, (draft) => {
            draft.exception.status = status
            draft.exception.updated_at = now
          }),
        )

        type ListArgs = ExceptionListParams | void
        const state = getState() as {
          exceptionsApi: ReturnType<typeof exceptionsApi.reducer>
        }

        const cachedLists = exceptionsApi.util.selectCachedArgsForQuery(
          state,
          'getExceptions',
        ) as ListArgs[]

        const listPatches = cachedLists.map((args) =>
          dispatch(
            exceptionsApi.util.updateQueryData('getExceptions', args, (draft) => {
              const item = draft.data.find((e) => e.id === id)
              if (item) {
                item.status = status
                item.updated_at = now
              }
            }),
          ),
        )

        try {
          const { data: updated } = await queryFulfilled

          dispatch(
            exceptionsApi.util.updateQueryData('getExceptionById', id, (draft) => {
              draft.exception = updated
            }),
          )

          for (const args of cachedLists) {
            dispatch(
              exceptionsApi.util.updateQueryData('getExceptions', args, (draft) => {
                const item = draft.data.find((e) => e.id === id)
                if (item) Object.assign(item, updated)
              }),
            )
          }
        } catch {
          patchDetail.undo()
          listPatches.forEach((p) => p.undo())
        }
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Exception', id },
        { type: 'ExceptionList', id: 'LIST' },
        { type: 'Dashboard', id: 'SUMMARY' },
      ],
    }),
  }),
})

export const {
  useGetExceptionsQuery,
  useGetExceptionByIdQuery,
  useGetDashboardSummaryQuery,
  useUpdateExceptionStatusMutation,
} = exceptionsApi
