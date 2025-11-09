import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { initialMockupState, mockupReducer } from './mockupReducer'

const MockupContext = createContext(null)

export function MockupProvider({ children }) {
  const [state, dispatch] = useReducer(mockupReducer, initialMockupState)

  // Load persisted preferences
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mockup:prefs')
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed?.meta) {
          dispatch({ type: 'setMeta', payload: parsed.meta })
        }
        if (parsed?.exportScale) {
          dispatch({ type: 'setExportScale', payload: parsed.exportScale })
        }
        if (parsed?.view) {
          dispatch({ type: 'setView', payload: parsed.view })
        }
      }
    } catch {}
  }, [])

  // Persist preferences on change
  useEffect(() => {
    try {
      const payload = {
        meta: state.meta,
        exportScale: state.exportScale,
        view: state.view,
      }
      localStorage.setItem('mockup:prefs', JSON.stringify(payload))
    } catch {}
  }, [state.meta, state.exportScale, state.view])

  const actions = useMemo(() => {
    return {
      setImageFile(fileOrObj) {
        if (!fileOrObj) {
          dispatch({ type: 'setImageFile', payload: { file: null, objectUrl: null } })
          return
        }
        if (fileOrObj && typeof fileOrObj === 'object' && 'file' in fileOrObj) {
          const { file, objectUrl } = fileOrObj
          dispatch({ type: 'setImageFile', payload: { file, objectUrl: objectUrl || (file ? URL.createObjectURL(file) : null) } })
        } else {
          const file = fileOrObj
          const objectUrl = file ? URL.createObjectURL(file) : null
          dispatch({ type: 'setImageFile', payload: { file, objectUrl } })
        }
      },
      clearImage() {
        dispatch({ type: 'setImageFile', payload: { file: null, objectUrl: null } })
      },
      setSquareDataUrl(dataUrl) {
        dispatch({ type: 'setSquareDataUrl', payload: dataUrl })
      },
      setMeta(nextPartialMeta) {
        dispatch({ type: 'setMeta', payload: nextPartialMeta })
      },
      setService(service) {
        dispatch({ type: 'setService', payload: service })
      },
      setView(view) {
        dispatch({ type: 'setView', payload: view })
      },
      setTheme(theme) {
        dispatch({ type: 'setTheme', payload: theme })
      },
      setExportScale(scale) {
        dispatch({ type: 'setExportScale', payload: scale })
      },
      reset() {
        dispatch({ type: 'reset' })
      },
    }
  }, [])

  const value = useMemo(() => ({ state, actions }), [state, actions])

  return <MockupContext.Provider value={value}>{children}</MockupContext.Provider>
}

export function useMockup() {
  const ctx = useContext(MockupContext)
  if (!ctx) {
    throw new Error('useMockup must be used within a MockupProvider')
  }
  return ctx
}


