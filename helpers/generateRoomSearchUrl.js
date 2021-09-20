module.exports = (checkin, checkout) => {
  const searchParamsUrl =
    process.env.SEARCH_PARAMS_URL ||
    "&ad=2&ch=0&ag=-&group_code=&Code=&loyalty_code=&lang=pt-BR&currencyId=&c=2983&q=5462&hotel_folder=&NRooms=1";
  const baseUrl =
    process.env.BASE_URL || "https://book.omnibees.com/hotelresults?";
  const searchUrl = `${baseUrl}CheckIn=${checkin}&CheckOut=${checkout}${searchParamsUrl}`;
  return searchUrl;
};
