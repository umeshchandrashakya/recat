
export const getAllProducts = (json, products = []) => {
  if (json.hasOwnProperty("children")) {
    json.children.forEach(element => {
      getAllProducts(element, products);
    });
  } else {
    products.push(json);
  }
  return products;

}

export const getExpireProducts = (productsList, arrayOfExpiredProducts = []) => {
  productsList.filter(function (element) {
    var warrantyP = element.warrantyPeriod.charAt(0);

    if (isNaN(warrantyP)) {
      warrantyP = 0;
    } else {
      warrantyP = parseInt(warrantyP);
    }

    var extendedW = element.extendedWarranty.charAt(0);

    if (isNaN(extendedW)) {
      extendedW = 0;
    } else {
      extendedW = parseInt(extendedW)
    }

    // warranty expiry time

    var orderedDate = new Date(element.orderedDate);
    var year = orderedDate.getFullYear();
    var month = orderedDate.getMonth();
    var day = orderedDate.getDate();
    var expiryDate = new Date(year + (warrantyP + extendedW), month, day)

    if (expiryDate < new Date()) {
      arrayOfExpiredProducts.push(element);
    }
  });
  return arrayOfExpiredProducts;
}


export const Goingtoexpire = (allProducts) => {

    var goingToExpiredPro = allProducts.filter(function (element) {
    var warrantyP = element.warrantyPeriod.charAt(0);
   if (isNaN(warrantyP)) {
      warrantyP = 0;
    } else {
      warrantyP = parseInt(warrantyP);
    }

    var extendedW = element.extendedWarranty.charAt(0);

    if (isNaN(extendedW)) {
      extendedW = 0;
    } else {
      extendedW = parseInt(extendedW);
    }

    // warranty expiry time

    var orderedDate = new Date(element.orderedDate);
    var year = orderedDate.getFullYear();
    var month = orderedDate.getMonth();
    var day = orderedDate.getDate();
    var expiryDate = new Date(year + (warrantyP + extendedW), month, day);

    var currentDate = new Date();

    const diffTime = Math.abs(currentDate.getTime() - expiryDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(diffDays);

    if (diffDays <= 120) {
      return element;
    }
  });
  console.log("ExpireingProducts", goingToExpiredPro);
  return goingToExpiredPro;
}