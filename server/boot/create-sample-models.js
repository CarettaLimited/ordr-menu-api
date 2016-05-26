module.exports = function(app) {
  //data sources
  var mongoDs = app.dataSources.MyMongoDS;

  //create all models
   createUsers(function(err, users) {
    if (err) throw err;
    console.log('User models created sucessfully');
    createRestaurants(users, function(err, restaurants) {
      if (err) throw err;
      console.log('Restaurant models created sucessfully');
      createMenus(restaurants, function(err, menus) {
        if (err) throw err;
          console.log('Menu models created sucessfully');
          createMenuItems(menus, function(err, results) {
            if (err) throw err;
            console.log('MenuItem models created sucessfully');
          });
      });
    });
  });
    
  //create users
  function createUsers(cb) {
    mongoDs.automigrate('AppUser', function(err) {
      if (err) return cb(err);
      var AppUser = app.models.AppUser;
      AppUser.create([
        {email: 'mark@caretta.co.uk', password: 'password'},
        {email: 'john@doe.com', password: 'johndoe'},
        {email: 'jane@doe.com', password: 'janedoe'}
      ], cb);
    });
  }
 
  //create restaurants
  function createRestaurants(users, cb) {
    mongoDs.automigrate('Restaurant', function(err) {
      if (err) return cb(err);
      var Restaurant = app.models.Restaurant;
      Restaurant.create([
      {name: 'Bel Cafe', ownerId: users[0].id  },
      {name: 'Three Bees Coffee House', ownerId: users[0].id},
      {name: 'Caffe Artigiano', ownerId: users[0].id}
      ], cb);
    });
   }
   
  //create coffee shops
  function createMenus(restaurants, cb) {
    mongoDs.automigrate('Menu', function(err) {
      if (err) return cb(err);
      var Menu = app.models.Menu;
      Menu.create([
        {name: 'Bel Cafe Menu', description: 'This is the menu for Bel Cafe', restaurantId: restaurants[0].id},
        {name: 'Three Bees Coffee House Menu', description: 'This is the menu for Three Bees Coffee House', restaurantId: restaurants[1].id },
        {name: 'Caffe Artigiano Menu', description: 'This is the menu for Caffe Artigiano', restaurantId: restaurants[2].id }
      ], cb);
    });
  }
  //create reviews
  function createMenuItems(menus, cb) {
    mongoDs.automigrate('MenuItem', function(err) {
      if (err) return cb(err);
      var MenuItem = app.models.MenuItem;
      MenuItem.create([
        {
          name: "Custard",
          shortDescription: "Some Custard",
          longDescription: "Some Lovely lovely lovely Custard",
          price: 1.00,
          menuId: menus[0].id
        },
        {
          name: "Cheese & Biscuits",
          shortDescription: "Lovely Cheddar goodness and cracks",
          longDescription: "What a load of old cheese",
          price: 1.01,
          menuId: menus[0].id
        },
        {
          name: "Wine",
          shortDescription: "Drink up",
          longDescription: "Glug glug glug drink it down",
          price: 1.02,
          menuId: menus[0].id
        },
        {
          name: "Curry & Rice",
          shortDescription: "Some Custard",
          longDescription: "Some Lovely lovely lovely Custard",
          price: 112.00,
          menuId: menus[1].id
        },
        {
          name: "Chips or Rice",
          shortDescription: "Do you want chips or rice?",
          longDescription: "Bring on the lovely chippies or indulge in the rice that is nice",
          price: 132.00,
          menuId: menus[1].id
        },
        {
          name: "Yoghurt",
          shortDescription: "Tasty bacterial goodness",
          longDescription: "Its got good bacteria and bad bacteria and swiss bacteria",
          price: 121.00,
          menuId: menus[1].id
        },
        {
          name: "Ryvitas",
          shortDescription: "Eat em and be healthy",
          longDescription: "Eat that cardboardy goodness and be so healthy",
          price: 21.00,
          menuId: menus[1].id
        },
        {
          name: "Some tasty taters",
          shortDescription: "Chip em, mash em, stick em in a pot",
          longDescription: "Eat em all up when they are lovely and hot",
          price: 31.00,
          menuId: menus[1].id
        },
        {
          name: "Bovril",
          shortDescription: "A gravy based drink. who would have thought",
          longDescription: "A gravy based drink. who would have thought",
          price: 31.00,
          menuId: menus[1].id
        },
        {
          name: "Water",
          shortDescription: "drink up",
          longDescription: "Eye of the tiger",
          price: 51.00,
          menuId: menus[2].id
        },
        {
          name: "Sri Lankan Curry and Peas",
          shortDescription: "Spicy as you like Sri Lankan curry with peas",
          longDescription: "Spicy as you like Sri Lankan curry with peas",
          price: 43.00,
          menuId: menus[2].id
  
        }
      ], cb);
    });
  }
};
