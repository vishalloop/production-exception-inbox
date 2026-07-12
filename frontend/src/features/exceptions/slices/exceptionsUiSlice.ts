import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ExceptionStatus, Severity } from '@/shared/types/enums'

export interface ExceptionsFilters {
  product_code: string
  severity: Severity | ''
  status: ExceptionStatus | ''
}

interface ExceptionsUiState {
  filters: ExceptionsFilters
  selectedExceptionId: number | null
  collapsedDays: Record<string, boolean>
}

const initialState: ExceptionsUiState = {
  filters: {
    product_code: '',
    severity: '',
    status: '',
  },
  selectedExceptionId: null,
  collapsedDays: {},
}

const exceptionsUiSlice = createSlice({
  name: 'exceptionsUi',
  initialState,
  reducers: {
    setProductFilter(state, action: PayloadAction<string>) {
      state.filters.product_code = action.payload
    },
    setSeverityFilter(state, action: PayloadAction<Severity | ''>) {
      state.filters.severity = action.payload
    },
    setStatusFilter(state, action: PayloadAction<ExceptionStatus | ''>) {
      state.filters.status = action.payload
    },
    resetFilters(state) {
      state.filters = initialState.filters
    },
    selectException(state, action: PayloadAction<number | null>) {
      state.selectedExceptionId = action.payload
    },
    /** Flip collapse using the *current* UI state (handles defaultExpanded correctly). */
    toggleDayCollapsed(
      state,
      action: PayloadAction<{ day: string; currentlyCollapsed: boolean }>,
    ) {
      state.collapsedDays[action.payload.day] = !action.payload.currentlyCollapsed
    },
    setDayCollapsed(state, action: PayloadAction<{ day: string; collapsed: boolean }>) {
      state.collapsedDays[action.payload.day] = action.payload.collapsed
    },
  },
})

export const {
  setProductFilter,
  setSeverityFilter,
  setStatusFilter,
  resetFilters,
  selectException,
  toggleDayCollapsed,
  setDayCollapsed,
} = exceptionsUiSlice.actions

export default exceptionsUiSlice.reducer
