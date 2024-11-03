const bikeNamesInput = document.getElementById("bikeNames");
const createAuctionE = document.getElementById("createAutionBtn");
const startingPrice = document.getElementById("startingPrice");
const reservedPrice = document.getElementById("reservedPrice");
const dateTime = document.getElementById("date-time");
document.addEventListener("DOMContentLoaded", loadBikes);
document.addEventListener("DOMContentLoaded", clearValues);

document.addEventListener("DOMContentLoaded", checkIDFromBikePage);

function checkIDFromBikePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const bikeId = urlParams.get("id");
  if (bikeId) {
    bikeNamesInput.value = bikeId;
  }
}
// clear input data
function clearValues() {
  startingPrice.value = "";
  reservedPrice.value = "";
  dateTime.value = 0;
}
// Load bike name with its id
function loadBikes() {
  let id = localStorage.getItem("_id");
  let auction = getAuctionSystem();
  //   let sellerID = auction["auctions"].map((a) => a.sellerId);
  let item = auction["items"].filter((i) => i.createdBy == id && !i.auctionId);
  console.log("Item", item);

  if (item.length > 0) {
    item.forEach((bike) => {
      const opt = document.createElement("option");
      opt.value = bike.id;
      opt.innerText = bike.name;
      bikeNamesInput.appendChild(opt);
    });
  }
}

createAuctionE.addEventListener("click", auctionCreate);

function validateAuctionForm(bikeName, startPrice, reserPrice, dt) {
  let errs = {};
  if (!bikeName) {
    errs.err_name = "Please choose bike name!";
  }
  if (!startPrice) {
    errs.err_startingPrice = "Please enter starting price!";
  } else if (isNaN(startPrice) || startPrice <= 0) {
    errs.err_startingPrice = "Invalid price!";
  }

  if (!reserPrice) {
    errs.err_reservedPrice = "Please enter reserved price!";
  } else if (isNaN(reserPrice) || reserPrice <= 0) {
    errs.err_reservedPrice = "Invalid price!";
  }

  if (reserPrice < startPrice) {
    errs.err_reservedPrice =
      "Reserve price should be grater than starting price.!(For make Sence)";
  }

  if (!dt) {
    errs.err_Date = "Please select data&time.";
  }
  if (Object.keys(errs).length != 0) {
    displayErrors(errs, "er", "err-bike");
    return false;
  }
  displayErrors(errs, "er", "err-bike");
  return true;
}

// create
function auctionCreate() {
  let bikeName = bikeNamesInput.value.trim();
  let startPrice = startingPrice.value.trim();
  let reserPrice = reservedPrice.value.trim();
  let dt = dateTime.value;

  if (validateAuctionForm(bikeName, startPrice, reserPrice, dt)) {
    const userId = localStorage.getItem("_id");

    let auction = createAuction(
      crypto.randomUUID(),
      bikeName,
      userId,
      startPrice,
      reserPrice,
      dt
    );
    let acc = getAuctionSystem();
    // update auction id to item obj
    let bike = acc["items"].find((bike) => bike.id == bikeName);
    let idx = acc["items"].indexOf(bike);
    bike.auctionId = auction.id;
    auction.status = "Active"; //set auctive Auction
    acc["items"].splice(idx, 1, bike);
    if (!acc?.auctions) {
      acc["auctions"] = [];
    }
    acc["auctions"].push(auction);
    updateAuctionSystem(acc);
    window.location.href = "activeAuctions.html";
  }
  //   console.log("c");
}
