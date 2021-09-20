module.exports = {
  async getContent(page) {
    let rooms = await page.evaluate(async () => {
      let data = [];
      let elements = document.getElementsByClassName("roomrate");

      for (const element of elements) {
        let name = "",
          description = "",
          price,
          image = "";

        const nameElement = element.querySelector(".custom-hotel-name");
        if (nameElement)
          name = await clearElementString(nameElement.textContent);

        const descriptionElement = element.querySelector(".hotel-description");
        if (descriptionElement)
          description = await clearElementString(
            descriptionElement.textContent
          );

        const priceElement = element.getElementsByClassName("price-total")[0];
        if (priceElement)
          price = await clearElementString(priceElement.textContent);
        const priceAfterElement =
          element.getElementsByClassName("price-after")[0];
        if (priceAfterElement)
          price = await clearElementString(priceAfterElement.textContent);

        const imageElement = element.querySelector(".image-step2");
        if (imageElement) image = imageElement.getAttribute("src");

        if (price) {
          data.push({
            name,
            description,
            price,
            image,
          });
        }
      }
      return data;
    });

    return rooms;
  },
};
