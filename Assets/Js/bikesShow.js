const filters = {
  in_auction: 1,
  not_in_auction: 2,
  all_bikes: 0,
  by_owner: 3,
  by_brandName: 5,
};

const bikeInfo = document.getElementById("bikes-info");
const inAuction = document.getElementById("in_auction");
const notInAuction = document.getElementById("not_in_auction");
const allBikes = document.getElementById("all_bikes");
const byBrandName = document.getElementById("by_brandName");
const byOnwer = document.getElementById("by_owner");
const bikesEl = document.getElementById("bikes");

document.addEventListener("loadstart", loading);
document.addEventListener("DOMContentLoaded", stopLoading);

const bikeDetails = [
  {
    bikeName: "Yamaha MT-15",
    model: "MT-15",
    brand: "Yamaha",
    year: 2023,
    engineCapacity: "155cc",
  },
  {
    bikeName: "Yamaha R15 V4",
    model: "R15 V4",
    brand: "Yamaha",
    year: 2022,
    engineCapacity: "155cc",
  },
  {
    bikeName: "Yamaha FZ S FI",
    model: "FZ S FI",
    brand: "Yamaha",
    year: 2023,
    engineCapacity: "149cc",
  },
  {
    bikeName: "Yamaha YZF-R3",
    model: "YZF-R3",
    brand: "Yamaha",
    year: 2021,
    engineCapacity: "321cc",
  },
  {
    bikeName: "Yamaha FZ25",
    model: "FZ25",
    brand: "Yamaha",
    year: 2022,
    engineCapacity: "249cc",
  },
  {
    bikeName: "Honda CBR 650R",
    model: "CBR 650R",
    brand: "Honda",
    year: 2023,
    engineCapacity: "649cc",
  },
  {
    bikeName: "Honda Hornet 2.0",
    model: "Hornet 2.0",
    brand: "Honda",
    year: 2023,
    engineCapacity: "184cc",
  },
  {
    bikeName: "Honda H'ness CB350",
    model: "H'ness CB350",
    brand: "Honda",
    year: 2023,
    engineCapacity: "348cc",
  },
  {
    bikeName: "Honda CB200X",
    model: "CB200X",
    brand: "Honda",
    year: 2022,
    engineCapacity: "184cc",
  },
  {
    bikeName: "Kawasaki Ninja 650",
    model: "Ninja 650",
    brand: "Kawasaki",
    year: 2022,
    engineCapacity: "649cc",
  },
  {
    bikeName: "Kawasaki Z900",
    model: "Z900",
    brand: "Kawasaki",
    year: 2022,
    engineCapacity: "948cc",
  },
  {
    bikeName: "Kawasaki Vulcan S",
    model: "Vulcan S",
    brand: "Kawasaki",
    year: 2021,
    engineCapacity: "649cc",
  },
  {
    bikeName: "Suzuki Gixxer SF",
    model: "Gixxer SF",
    brand: "Suzuki",
    year: 2022,
    engineCapacity: "155cc",
  },
  {
    bikeName: "Suzuki Intruder",
    model: "Intruder",
    brand: "Suzuki",
    year: 2021,
    engineCapacity: "155cc",
  },
  {
    bikeName: "Ducati Panigale V2",
    model: "Panigale V2",
    brand: "Ducati",
    year: 2022,
    engineCapacity: "955cc",
  },
  {
    bikeName: "Ducati Monster",
    model: "Monster",
    brand: "Ducati",
    year: 2023,
    engineCapacity: "937cc",
  },
  {
    bikeName: "Royal Enfield Classic 350",
    model: "Classic 350",
    brand: "Royal Enfield",
    year: 2022,
    engineCapacity: "349cc",
  },
  {
    bikeName: "Royal Enfield Meteor 350",
    model: "Meteor 350",
    brand: "Royal Enfield",
    year: 2021,
    engineCapacity: "349cc",
  },
  {
    bikeName: "Royal Enfield Himalayan",
    model: "Himalayan",
    brand: "Royal Enfield",
    year: 2023,
    engineCapacity: "411cc",
  },
  {
    bikeName: "Bajaj Pulsar 150",
    model: "Pulsar 150",
    brand: "Bajaj",
    year: 2023,
    engineCapacity: "149cc",
  },
  {
    bikeName: "Bajaj Pulsar NS200",
    model: "Pulsar NS200",
    brand: "Bajaj",
    year: 2022,
    engineCapacity: "199cc",
  },
  {
    bikeName: "Bajaj Dominar 400",
    model: "Dominar 400",
    brand: "Bajaj",
    year: 2023,
    engineCapacity: "373cc",
  },
  {
    bikeName: "TVS Apache RTR 160",
    model: "Apache RTR 160",
    brand: "TVS",
    year: 2022,
    engineCapacity: "159cc",
  },
  {
    bikeName: "TVS Jupiter",
    model: "Jupiter",
    brand: "TVS",
    year: 2023,
    engineCapacity: "110cc",
  },
  {
    bikeName: "Hero Splendor Plus",
    model: "Splendor Plus",
    brand: "Hero",
    year: 2023,
    engineCapacity: "97cc",
  },
  {
    bikeName: "Hero Passion Pro",
    model: "Passion Pro",
    brand: "Hero",
    year: 2022,
    engineCapacity: "113cc",
  },
  {
    bikeName: "Hero HF Deluxe",
    model: "HF Deluxe",
    brand: "Hero",
    year: 2023,
    engineCapacity: "97cc",
  },
  {
    bikeName: "KTM Duke 200",
    model: "Duke 200",
    brand: "KTM",
    year: 2022,
    engineCapacity: "199cc",
  },
  {
    bikeName: "KTM RC 390",
    model: "RC 390",
    brand: "KTM",
    year: 2023,
    engineCapacity: "373cc",
  },
  {
    bikeName: "Mahindra Mojo",
    model: "Mojo",
    brand: "Mahindra",
    year: 2022,
    engineCapacity: "294cc",
  },
  {
    bikeName: "Triumph Street Twin",
    model: "Street Twin",
    brand: "Triumph",
    year: 2022,
    engineCapacity: "900cc",
  },
  {
    bikeName: "Triumph Bonneville T120",
    model: "Bonneville T120",
    brand: "Triumph",
    year: 2023,
    engineCapacity: "1200cc",
  },
  {
    bikeName: "Hero Maestro Edge",
    model: "Maestro Edge",
    brand: "Hero",
    year: 2023,
    engineCapacity: "110cc",
  },
  {
    bikeName: "TVS Apache RR 310",
    model: "Apache RR 310",
    brand: "TVS",
    year: 2023,
    engineCapacity: "312cc",
  },
  {
    bikeName: "TVS XL100",
    model: "XL100",
    brand: "TVS",
    year: 2023,
    engineCapacity: "99cc",
  },
  {
    bikeName: "Ather 450X",
    model: "450X",
    brand: "Ather",
    year: 2023,
    engineCapacity: "Electric",
  },
  {
    bikeName: "Revolt RV400",
    model: "RV400",
    brand: "Revolt",
    year: 2023,
    engineCapacity: "Electric",
  },
  {
    bikeName: "Tork Kratos",
    model: "Kratos",
    brand: "Tork",
    year: 2023,
    engineCapacity: "Electric",
  },
  {
    bikeName: "Ola S1",
    model: "S1",
    brand: "Ola",
    year: 2023,
    engineCapacity: "Electric",
  },
  {
    bikeName: "Yamaha Fazer 25",
    model: "Fazer 25",
    brand: "Yamaha",
    year: 2019,
    engineCapacity: "249cc",
  },
  {
    bikeName: "Yamaha SZ-RR",
    model: "SZ-RR",
    brand: "Yamaha",
    year: 2018,
    engineCapacity: "149cc",
  },
  {
    bikeName: "Yamaha XSR155",
    model: "XSR155",
    brand: "Yamaha",
    year: 2020,
    engineCapacity: "155cc",
  },
  // Extended bikes below
  {
    bikeName: "Honda CB300R",
    model: "CB300R",
    brand: "Honda",
    year: 2022,
    engineCapacity: "286cc",
  },
  {
    bikeName: "Hero Xpulse 200",
    model: "Xpulse 200",
    brand: "Hero",
    year: 2023,
    engineCapacity: "199cc",
  },
  {
    bikeName: "Kawasaki Ninja H2",
    model: "Ninja H2",
    brand: "Kawasaki",
    year: 2022,
    engineCapacity: "998cc",
  },
  {
    bikeName: "Royal Enfield Scram 411",
    model: "Scram 411",
    brand: "Royal Enfield",
    year: 2023,
    engineCapacity: "411cc",
  },
  {
    bikeName: "Ducati Scrambler Icon",
    model: "Scrambler Icon",
    brand: "Ducati",
    year: 2022,
    engineCapacity: "803cc",
  },
  {
    bikeName: "Suzuki V-Strom 650",
    model: "V-Strom 650",
    brand: "Suzuki",
    year: 2023,
    engineCapacity: "645cc",
  },
  {
    bikeName: "Harley Davidson Iron 883",
    model: "Iron 883",
    brand: "Harley Davidson",
    year: 2021,
    engineCapacity: "883cc",
  },
  {
    bikeName: "Benelli TRK 502X",
    model: "TRK 502X",
    brand: "Benelli",
    year: 2023,
    engineCapacity: "500cc",
  },
  {
    bikeName: "BMW G 310 GS",
    model: "G 310 GS",
    brand: "BMW",
    year: 2023,
    engineCapacity: "313cc",
  },
  {
    bikeName: "Triumph Tiger 850 Sport",
    model: "Tiger 850 Sport",
    brand: "Triumph",
    year: 2023,
    engineCapacity: "888cc",
  },
  //... Continue to reach the total 300+ bikes
];

const brands = [...new Set(bikeDetails.map((bike) => bike.brand))];
// Load bike models for filteration process

document.addEventListener("DOMContentLoaded", () => {
  byOnwer.value = "";
  brands.forEach((brand) => {
    const opt = document.createElement("option");
    opt.classList.add("brand-opt");
    opt.innerText = brand;
    opt.value = brand;
    byBrandName.appendChild(opt);
  });
});

document.addEventListener("DOMContentLoaded", loadBikes);
allBikes.checked = true;
// const activeAuctionsInfo = document.getElementById("active-auctions-info");
function loadBikes(arg, val, otherCodes) {
  let acc = getAuctionSystem();
  let bikes = acc["items"];
  let auctions = acc["auctions"];
  let id = localStorage.getItem("_id");
  let currentUserbikes = bikes.filter((bike) => bike.createdBy == id);
  // filter only the bike which is in active auction
  currentUserbikes = currentUserbikes.filter((bike) => {
    if (bike.auctionId) {
      let auction = auctions.find((ac) => ac.id == bike.auctionId);
      if (auction.sellerId == id && auction.status == "Active") {
        return bike;
      }
    } else {
      return bike;
    }
  });

  if (currentUserbikes.length > 0) {
    buildBikeItem(currentUserbikes, arg, val, otherCodes);
  } else {
    bikesEl.innerHTML = "";
    disPlayMessage({
      parent: bikesEl,
      type: "info",
      message: "No bikes found!",
      pad: 15,
      // offset: -2,
      // position: true,
      minWidth: "250px",
    });
  }
}

function buildBikeItem(bikes, arg, val, otherCodes) {
  const bikesEl = document.getElementById("bikes");
  bikesEl.innerHTML = "";
  let filteredItems = [];
  if (arg && arg != 0 && otherCodes) {
    // filters;
    function inAuctionFilter() {
      bikes = bikes.filter((bike) => bike.auctionId);
    }
    function notInAuctionFilter() {
      // filter by not in auction
      bikes = bikes.filter((bike) => !bike.auctionId);
    }
    function filterByOwener() {
      console.log(val);
      bikes = bikes.filter((bike) => bike.owner == val);
    }

    function filterByBrandName() {
      bikes = bikes.filter((bike) => bike.brand == val);
    }

    // console.log(bikes);
    if (arg == 1) {
      //filter by in auction
      inAuctionFilter();
    } else if (arg == 2) {
      //filter by not in auction
      notInAuctionFilter();
    } else if (arg == 3 && val) {
      //Filter by no of owners
      filterByOwener();
    } else if (arg == 5) {
      filterByBrandName();
    }
  }

  console.log("Active filters ", otherCodes);
  console.log("bikes", bikes);

  if (bikes.length > 0) {
    bikes.reverse().forEach((bike) => {
      const bikeCard = document.createElement("div");
      bikeCard.classList.add("bike-card");

      let isInAuction = false;
      if (bike.auctionId) {
        isInAuction = true;
      }

      let val = !isInAuction ? `createAuction.html?id=${bike.id}` : "";
      let ele = `
          <div class="bike-imageEl">
            <img src="${bike.image}" alt="" />
          </div>
          <div class="bike-body">
            <p class="bikeHeading">Name</p>
            <p class="bikeData">${bike.name}</p>
            <p class="bikeHeading">Brand</p>
            <p class="bikeData">${bike.brand}</p>
            <p class="bikeHeading">Model</p>
            <p class="bikeData">${bike.model}</p>
            <p class="bikeHeading">Year</p>
            <p class="bikeData">${bike.year}</p>
            <p class="bikeHeading">Engine capacity</p>
            <p class="bikeData">${bike.capacity}</p>
            <p class="bikeHeading">Owners</p>
            <p class="bikeData">${bike.owner}</p>
            <p class="bikeHeading">${
              isInAuction ? "Status" : "Add to auction"
            }</p>
            <a class='add-to-auction-link' id='add-to-auction' href=${val}>${
        isInAuction ? "In auction" : "Click"
      }</a>
          </div>
        `;
      bikeCard.innerHTML = ele;
      bikesEl.appendChild(bikeCard);
    });
  } else {
    bikesEl.innerHTML = ` <div class="not-found" id="bikes-info">No Bikes Found</div>`;
    const bikeInfo = document.getElementById("bikes-info");
    bikeInfo.classList.add("show");
  }
}

function logout() {
  localStorage.removeItem("login-status");
  window.location.reload();
}

// filter process

inAuction.addEventListener("change", (e) => {
  filterBike(e.target.id);
});
notInAuction.addEventListener("change", (e) => {
  filterBike(e.target.id);
});
allBikes.addEventListener("change", (e) => {
  filterBike(e.target.id);
});

byBrandName.addEventListener("change", (e) => {
  filterBike(e.target.id, e.target.value);
});
// It extracts the filter code and send for filteration process
function filterBike(id, owners) {
  let eventCode = filters[id];
  let otherCodes = filterValuesExtractor();
  loadBikes(eventCode, owners, otherCodes);
}

// filter by owner name
byOnwer.addEventListener("change", (e) => {
  console.log(e.target.value);

  filterBike(e.target.id, e.target.value);
});

byOnwer.addEventListener("keyup", (e) => {
  console.log(e.target.value);

  filterBike(e.target.id, e.target.value);
});

function filterValuesExtractor() {
  let codes = [];
  if (inAuction.checked) {
    codes.push(inAuction.id);
  }
  if (notInAuction.checked) {
    codes.push(notInAuction.id);
  }
  if (byOnwer.value) {
    codes.push(byOnwer.id);
  }
  if (allBikes.chcked) {
    codes.push(allBikes.id);
  }
  if (byBrandName.value) {
    codes.push(byBrandName.id);
  }
  console.log(codes);

  return codes.map((e) => filters[e]).filter((v) => v);
}
