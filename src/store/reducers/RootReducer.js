import { combineReducers } from 'redux';

import categoryReducer  from './CategoryReducer';
import tagReducer  from './TagReducer';
import postReducer from './PostReducer';
import commentReducer from './CommentReducer';
import userReducer from './UserReducer';
import RequestServiceReducer from './RequestServiceReducer';

const rootReducer = combineReducers({
   category: categoryReducer,
   tag: tagReducer,
   post: postReducer,
   comment: commentReducer,
   user: userReducer,
   requestService:RequestServiceReducer
});

export default rootReducer;