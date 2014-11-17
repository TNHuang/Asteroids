(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.game = game;
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  GameView.MOVES = {
    "w": [ 0, -1],
    "a": [-1,  0],
    "s": [ 0,  1],
    "d": [ 1,  0],
  };


  GameView.prototype.MouseEventHanlder = function (){
    var ship = this.ship;
    var ctx = this.ctx;
    var offsetX = this.canvas.offsetLeft;
    var offsetY = this.canvas.offsetTop;

    $(this.canvas).mousemove( function(event){
      var x = event.pageX - offsetX;
      var y = event.pageY - offsetY;
      var dx = x - ship.pos[0];
      var dy = y - ship.pos[1];
      var mag = Math.sqrt( dx*dx + dy*dy);
      var dvx = (dx-ship.vel[0])/100;
      var dvy = (dy-ship.vel[1])/100;
      ship.dir = [ship.vel[0], ship.vel[1]];
      move = [dvx, dvy];
      ship.power(move);
    }.bind(this));


    $(this.canvas).click( function(event){
        ship.fireBullet();
    });
  };



  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function (k) {
      var move = GameView.MOVES[k];
      key(k, function () { ship.power(move); });
    });

    key("space", function () { ship.fireBullet() });
  };

  GameView.prototype.start = function () {
    var gameView = this;
    this.timerId = this.restart(gameView);
    this.MouseEventHanlder();
    this.bindKeyHandlers();
  };

  GameView.prototype.stop = function () {
    clearInterval(this.timerId);
  };

  GameView.prototype.restart = function(gameView) {
    var timerId =  setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 30
    );

    return timerId;
  };

  GameView.prototype.MenuHandler = function() {
    //will be implement restart and start later
  };


})();
