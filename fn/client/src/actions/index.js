import { categoriesLoaded, categoriesRequested } from './Categories-actions';

import {
  productsLoaded,
  productsRequested,
  currencyChange,
  addCurrentPage,
  addPostsPerPage,
  addPagesCount,
  addSortByPrice,
  productLoaded,
  sizesLoaded,
} from './Products-actions';

import {addToCart, increaseToCart, decreaseFromCart, removeFromCart} from './Cart-action'
import {addToWishlist, removeFromWishlist} from './Wishlist-actions'

import {
  catalogsLoaded,
  catalogsRequested,
  catalogLoaded,
} from './Catalogs-actions';

import {
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveCategory,
  filterRemoveAllCategories,
  filterRemoveAllBrands,
  filterRemoveColor,
  filterRemoveBrand,
  filterByName,
  setSearchValue,
} from './Filter-actions';

import {
  postUserSuccess,
  postUserStarted,
  postUserError,
  logoutUser,
  postUserLoginSuccess,
  setUser
} from './Auth-actions';

import {setShowSnackbar, setSnackbarText} from './Snackbar--actions'

export {
  categoriesRequested,
  categoriesLoaded,
  catalogLoaded,
  catalogsLoaded,
  catalogsRequested,
  productsRequested,
  productsLoaded,
  currencyChange,
  filterAddBrand,
  filterAddCategory,
  filterAddColor,
  filterRemoveBrand,
  filterRemoveAllBrands,
  filterRemoveCategory,
  filterRemoveAllCategories,
  filterRemoveColor,
  addCurrentPage,
  addPostsPerPage,
  addPagesCount,
  addSortByPrice,
  filterByName,
  productLoaded,
  sizesLoaded,
  postUserError,
  postUserSuccess,
  postUserStarted,
  setSearchValue,
  addToCart,
  increaseToCart,
  decreaseFromCart,
  removeFromCart,
  addToWishlist,
  removeFromWishlist,
  logoutUser,
  postUserLoginSuccess,
  setUser,
  setShowSnackbar,
  setSnackbarText,
};
