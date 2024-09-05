//User
const userSelectors = 'name email';
export const UserPopulate = { path: 'user', select: userSelectors };
export const SellerPopulate = { path: 'seller', select: userSelectors };
export const LikedbyPopulate = { path: 'likedBy', select: userSelectors };
export const WishlistPopulate = { path: 'wishlist', select: userSelectors };

//Category
const catSelectors = 'name';
export const CategoryPopulate = { path: 'category', select: catSelectors };
