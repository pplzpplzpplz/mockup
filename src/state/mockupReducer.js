export const initialMockupState = {
  image: {
    file: null,
    objectUrl: null,
    squareDataUrl: null,
  },
  meta: {
    artistName: '',
    songTitle: '',
    albumTitle: '',
  },
  service: 'spotify',
  view: 'mobile', // 'mobile' | 'desktop'
  theme: 'dark',
  exportScale: 1,
};

export function mockupReducer(state, action) {
  switch (action.type) {
    case 'setImageFile': {
      const { file, objectUrl } = action.payload || {};
      return {
        ...state,
        image: {
          file: file || null,
          objectUrl: objectUrl || null,
          squareDataUrl: null,
        },
      };
    }
    case 'setSquareDataUrl': {
      return {
        ...state,
        image: {
          ...state.image,
          squareDataUrl: action.payload || null,
        },
      };
    }
    case 'setMeta': {
      return {
        ...state,
        meta: { ...state.meta, ...(action.payload || {}) },
      };
    }
    case 'setService': {
      return { ...state, service: action.payload || 'spotify' };
    }
    case 'setView': {
      return { ...state, view: action.payload || 'mobile' };
    }
    case 'setTheme': {
      return { ...state, theme: action.payload || 'dark' };
    }
    case 'setExportScale': {
      return { ...state, exportScale: action.payload || 1 };
    }
    case 'reset': {
      return { ...initialMockupState };
    }
    default:
      return state;
  }
}


