export default function createAsyncDispatcher(type, promiseFn) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  async function actionHandler(dispatch, ...rest) {
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (e) {
      dispatch({ type: ERROR, error: e });
    }
  }
  return actionHandler;
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
};

const getPostloading = {
  loading: true,
  data: null,
  error: null,
};
const getPostSuccess = (data) => ({ loading: false, data, error: false });
const getPostFailded = (e) => ({ loading: false, data: null, error: e });

export function createAsyncHandler(type, key) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  // 리듀서를 만들어준다.
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: getPostloading,
        };
      case SUCCESS:
        return {
          ...state,
          [key]: getPostSuccess(action.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: getPostFailded(action.error),
        };
      default:
        return state;
    }
  }
  return handler;
}
