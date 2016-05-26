module.exports = function(Restaurant) {
  Restaurant.beforeRemote('create', function(context, user, next) {
    //context.args.data.date = Date.now();
    context.args.data.ownerId = context.req.accessToken.userId;
    next();
  });
};
