'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];


//  Step 1: Euro-Kilometers
function NbOfDays(date1,date2){
  var days = date2.getTime()- date1.getTime();
  return days/(1000*60*60*24)+1;
}

function Rentalprice1(rentals,cars){ 
  let time;
  let distance;
  let price = [];
  let total_days = [];

  rentals.forEach(r => {
    const date1 = new Date(r.pickupDate);
    const date2 = new Date(r.returnDate);
    const days = NbOfDays(date1,date2)
    total_days.push(days);
    const kilometers = r.distance != null ? r.distance : 0;

    cars.forEach(c => {

      if(r.carId == c.id) {

        time = days * c.pricePerDay ;

        distance = kilometers*c.pricePerKm;
        
        price.push(time+distance)
        
      }

    });

       
  });
  return  {price,total_days};
}


// Step 2: Drive More, Pay Less

function DecreasePrice(total_days, reg_price)
{
    let new_price = [] ;
    for (var i = 0; i<total_days.length; i++){
      if(total_days[i] > 10){
        new_price.push(reg_price[i]/2);
      }
      else if(total_days[i] > 4){
        new_price.push(reg_price[i]*0.7);
      }
      else if (total_days[i] > 1){
        new_price.push(reg_price[i]*0.9);
      }
      else {
        new_price.push(reg_price[i]);
      }
    }

    return new_price; 
}

function Rentalprice2(rentals, cars){
    const reg_price=Rentalprice1(rentals,cars)
    
    const price = DecreasePrice(reg_price.total_days,reg_price.price)

    for (var i=0;i<rentals.length;i++){
      rentals[i].price=price[i];
    }

    return price;
}


// Step 3: Give Me All Your Money

function GetTotalDays(rentals){
  let total_days = [];
  rentals.forEach(r => {
    const date1 = new Date(r.pickupDate);
    const date2 = new Date(r.returnDate);
    const days = NbOfDays(date1,date2)
    total_days.push(days);
  });
  return total_days;
}

function Commision(total_days,rentals){
  let commission=[];
  for(var i=0;i<rentals.length;i++){
    commission[i] = rentals[i].price*0.7;
    rentals[i].commission.insurance=commission[i]/2;
    rentals[i].commission.treasury=total_days[i];
    rentals[i].commission.virtuo=commission[i]-rentals[i].commission.insurance-rentals[i].commission.treasury;
  }
  return rentals;
}



//console.log(cars);
//console.log(rentals);
//console.log(actors);
const step1 = Rentalprice1(rentals,cars);
console.log("rental prices step 1: ");
for(var i=0;i<step1.price.length;i++){
  console.log("id: "+rentals[i].id);
  console.log(step1.price[i]+"\n");
}
const step2 = Rentalprice2(rentals,cars);
console.log("\n rental prices step 2: ");
for(var i=0;i<step2.length;i++){
  console.log("id: "+rentals[i].id);
  console.log(step2[i]+"\n");
}
const tot_days=GetTotalDays(rentals);
const step3 = Commision(tot_days,rentals);
console.log("\ncommission step 3: ");
for(var i=0;i<step3.length;i++){
  console.log("id: "+ rentals[i].id);
  console.log(step3[i].commission);
  console.log("\n");
}


