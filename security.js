/* -----------------------------------------------
/* Author : Vincent Garreau  - vincentgarreau.com
/* MIT license: http://opensource.org/licenses/MIT
/* Demo / Generator : vincentgarreau.com/particles.js
/* GitHub : github.com/VincentGarreau/particles.js
/* How to use? : Check the GitHub README
/* v2.0.0
/* ----------------------------------------------- */

var secJS = function(tag_id, params){

  var canvas_el = document.querySelector('#'+tag_id+' > .particles-js-canvas-el');

  /* particles.js variables with default values */
  this.secJS = {
    canvas: {
      el: canvas_el,
      w: canvas_el.offsetWidth,
      h: canvas_el.offsetHeight,
      center: {
        x: canvas_el.offsetWidth / 2,
        y: canvas_el.offsetHeight / 2
      }
    },
    time: {
      start: Date.now()
    },
    particles: {
      number: {
        value: 400,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#fff'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#ff0000'
        },
        polygon: {
          nb_sides: 5
        },
        image: {
          src: '',
          width: 100,
          height: 100
        }
      },
      opacity: {
        value: 1,
        random: false,
        anim: {
          enable: false,
          speed: 2,
          opacity_min: 0,
          sync: false
        }
      },
      size: {
        value: 20,
        random: false,
        anim: {
          enable: false,
          speed: 20,
          size_min: 0,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 100,
        color: '#fff',
        opacity: 1,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 3000,
          rotateY: 3000
        }
      },
      array: []
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab:{
          distance: 100,
          line_linked:{
            opacity: 1
          }
        },
        bubble:{
          distance: 200,
          size: 80,
          duration: 0.4
        },
        repulse:{
          distance: 200,
          duration: 0.4
        },
        push:{
          particles_nb: 4
        },
        remove:{
          particles_nb: 2
        }
      },
      mouse:{}
    },
    retina_detect: false,
    fn: {
      interact: {},
      modes: {},
      vendors:{}
    },
    tmp: {}
  };

  var secJS = this.secJS;

  /* params settings */
  if(params){
    Object.deepExtend(secJS, params);
  }

  secJS.tmp.obj = {
    size_value: secJS.particles.size.value,
    size_anim_speed: secJS.particles.size.anim.speed,
    move_speed: secJS.particles.move.speed,
    line_linked_distance: secJS.particles.line_linked.distance,
    line_linked_width: secJS.particles.line_linked.width,
    mode_grab_distance: secJS.interactivity.modes.grab.distance,
    mode_bubble_distance: secJS.interactivity.modes.bubble.distance,
    mode_bubble_size: secJS.interactivity.modes.bubble.size,
    mode_repulse_distance: secJS.interactivity.modes.repulse.distance
  };


  secJS.fn.retinaInit = function(){

    if(secJS.retina_detect && window.devicePixelRatio > 1){
      secJS.canvas.pxratio = window.devicePixelRatio;
      secJS.tmp.retina = true;
    }
    else{
      secJS.canvas.pxratio = 1;
      secJS.tmp.retina = false;
    }

    secJS.canvas.w = secJS.canvas.el.offsetWidth * secJS.canvas.pxratio;
    secJS.canvas.h = secJS.canvas.el.offsetHeight * secJS.canvas.pxratio;

    secJS.particles.size.value = secJS.tmp.obj.size_value * secJS.canvas.pxratio;
    secJS.particles.size.anim.speed = secJS.tmp.obj.size_anim_speed * secJS.canvas.pxratio;
    secJS.particles.move.speed = secJS.tmp.obj.move_speed * secJS.canvas.pxratio;
    secJS.particles.line_linked.distance = secJS.tmp.obj.line_linked_distance * secJS.canvas.pxratio;
    secJS.interactivity.modes.grab.distance = secJS.tmp.obj.mode_grab_distance * secJS.canvas.pxratio;
    secJS.interactivity.modes.bubble.distance = secJS.tmp.obj.mode_bubble_distance * secJS.canvas.pxratio;
    secJS.particles.line_linked.width = secJS.tmp.obj.line_linked_width * secJS.canvas.pxratio;
    secJS.interactivity.modes.bubble.size = secJS.tmp.obj.mode_bubble_size * secJS.canvas.pxratio;
    secJS.interactivity.modes.repulse.distance = secJS.tmp.obj.mode_repulse_distance * secJS.canvas.pxratio;

  };



  /* ---------- secJS functions - canvas ------------ */

  secJS.fn.canvasInit = function(){
    secJS.canvas.ctx = secJS.canvas.el.getContext('2d');
  };

  secJS.fn.canvasSize = function(){

    secJS.canvas.el.width = secJS.canvas.w;
    secJS.canvas.el.height = secJS.canvas.h;
    secJS.canvas.center.x = secJS.canvas.w / 2;
    secJS.canvas.center.y = secJS.canvas.h / 2;
    secJS.canvas.basicRadius = Math.min(secJS.canvas.w, secJS.canvas.h) / 2 / 1.5

    if(secJS && secJS.interactivity.events.resize){

      window.addEventListener('resize', function(){

          secJS.canvas.w = secJS.canvas.el.offsetWidth;
          secJS.canvas.h = secJS.canvas.el.offsetHeight;

          /* resize canvas */
          if(secJS.tmp.retina){
            secJS.canvas.w *= secJS.canvas.pxratio;
            secJS.canvas.h *= secJS.canvas.pxratio;
          }

          secJS.canvas.el.width = secJS.canvas.w;
          secJS.canvas.el.height = secJS.canvas.h;
          secJS.canvas.center.x = secJS.canvas.w / 2;
          secJS.canvas.center.y = secJS.canvas.h / 2;
          secJS.canvas.basicRadius = Math.min(secJS.canvas.w, secJS.canvas.h) / 2 / 1.5

          /* repaint canvas on anim disabled */
          if(!secJS.particles.move.enable){
            secJS.fn.particlesEmpty();
            secJS.fn.particlesCreate();
            secJS.fn.particlesDraw();
            secJS.fn.vendors.densityAutoParticles();
          }

        /* density particles enabled */
        secJS.fn.vendors.densityAutoParticles();

      });

    }

  };


  secJS.fn.canvasPaint = function(){
    secJS.canvas.ctx.fillRect(0, 0, secJS.canvas.w, secJS.canvas.h);
  };

  secJS.fn.canvasClear = function(){
    secJS.canvas.ctx.clearRect(0, 0, secJS.canvas.w, secJS.canvas.h);
  };


  /* --------- secJS functions - particles ----------- */

  secJS.fn.particle = function(color, opacity, countur, position){
    this.countur = countur

    /* size */
    this.radius = (secJS.particles.size.random ? Math.random() : 1) * secJS.particles.size.value;
    var dAngle = Math.random() * secJS.particles.move.speed / (countur * 3 + 1) / 1000

    /* position */
    this.orbit = {
      radius: {
        min: secJS.canvas.basicRadius * (0.5 * countur + 0.5) * 0.88,
        delta: secJS.canvas.basicRadius * (0.5 * countur + 0.5) * 0.1
      },
      dAngle: countur % 2 ? dAngle : -1 * dAngle
    }

    this.orbitStartRadius = this.orbit.radius.min + this.orbit.radius.delta * Math.random()
    this.orbitStartAngle = Math.random() * 2
    this.x = position ? position.x : secJS.canvas.center.x + Math.cos(Math.PI * this.orbitStartAngle) * this.orbitStartRadius;
    this.y = position ? position.y : secJS.canvas.center.x + Math.sin(Math.PI * this.orbitStartAngle) * this.orbitStartRadius;
    console.log(secJS.canvas.basicRadius, this.x, this.y, this.orbit)

    /* check position  - into the canvas */
    if(this.x > secJS.canvas.w - this.radius*2) this.x = this.x - this.radius;
    else if(this.x < this.radius*2) this.x = this.x + this.radius;
    if(this.y > secJS.canvas.h - this.radius*2) this.y = this.y - this.radius;
    else if(this.y < this.radius*2) this.y = this.y + this.radius;

    /* check position - avoid overlap */
    if(secJS.particles.move.bounce){
      secJS.fn.vendors.checkOverlap(this, position);
    }

    /* color */
    this.color = {};
    if(typeof(color.value) == 'object'){

      if(color.value instanceof Array){
        var color_selected = color.value[Math.floor(Math.random() * pJS.particles.color.value.length)];
        this.color.rgb = hexToRgb(color_selected);
      }else{
        if(color.value.r != undefined && color.value.g != undefined && color.value.b != undefined){
          this.color.rgb = {
            r: color.value.r,
            g: color.value.g,
            b: color.value.b
          }
        }
        if(color.value.h != undefined && color.value.s != undefined && color.value.l != undefined){
          this.color.hsl = {
            h: color.value.h,
            s: color.value.s,
            l: color.value.l
          }
        }
      }

    }
    else if(color.value == 'random'){
      this.color.rgb = {
        r: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        g: (Math.floor(Math.random() * (255 - 0 + 1)) + 0),
        b: (Math.floor(Math.random() * (255 - 0 + 1)) + 0)
      }
    }
    else if(typeof(color.value) == 'string'){
      this.color = color;
      this.color.rgb = hexToRgb(this.color.value);
    }

    /* opacity */
    this.opacity = (secJS.particles.opacity.random ? Math.random() : 1) * secJS.particles.opacity.value;
    if(secJS.particles.opacity.anim.enable){
      this.opacity_status = false;
      this.vo = secJS.particles.opacity.anim.speed / 100;
      if(!secJS.particles.opacity.anim.sync){
        this.vo = this.vo * Math.random();
      }
    }
  };


  secJS.fn.particle.prototype.draw = function() {

    var p = this;

    if(p.radius_bubble != undefined){
      var radius = p.radius_bubble;
    }else{
      var radius = p.radius;
    }

    if(p.opacity_bubble != undefined){
      var opacity = p.opacity_bubble;
    }else{
      var opacity = p.opacity;
    }

    if(p.color.rgb){
      var color_value = 'rgba('+p.color.rgb.r+','+p.color.rgb.g+','+p.color.rgb.b+','+opacity+')';
    }else{
      var color_value = 'hsla('+p.color.hsl.h+','+p.color.hsl.s+'%,'+p.color.hsl.l+'%,'+opacity+')';
    }

    secJS.canvas.ctx.fillStyle = color_value;
    secJS.canvas.ctx.beginPath();
    secJS.canvas.ctx.arc(p.x, p.y, radius, 0, Math.PI * 2, false);
    secJS.canvas.ctx.closePath();
    secJS.canvas.ctx.fill();

  };


  secJS.fn.particlesCreate = function(){
    for(var i = 0; i < 3; i++) {
      var pn =  10 * (i + 1) + Math.round(Math.random() * 10 * (i + 1)^2)
      for (var j = 0; j < pn; j++) {
        secJS.particles.array.push(new secJS.fn.particle(secJS.particles.color, secJS.particles.opacity.value, i));
      }
    }
  };

  secJS.fn.particlesUpdate = function(){

    for(var i = 0; i < secJS.particles.array.length; i++){

      /* the particle */
      var p = secJS.particles.array[i];

      /* move the particle */
      if(secJS.particles.move.enable){
        var r = p.orbitStartRadius
        var angle = p.orbitStartAngle + p.orbit.dAngle * (Date.now() - secJS.time.start)
        p.x = secJS.canvas.center.x + Math.cos(Math.PI * angle) * r;
        p.y = secJS.canvas.center.x + Math.sin(Math.PI * angle) * r;
      }

      /* interaction auto between particles */
      if(secJS.particles.line_linked.enable){
        for(var j = i + 1; j < secJS.particles.array.length; j++){
          var p2 = secJS.particles.array[j];
          secJS.fn.interact.linkParticles(p,p2);
        }
      }
    }

  };

  secJS.fn.particlesDraw = function(){

    /* clear canvas */
    secJS.canvas.ctx.clearRect(0, 0, secJS.canvas.w, secJS.canvas.h);

    /* update each particles param */
    secJS.fn.particlesUpdate();

    /* draw each particle */
    for(var i = 0; i < secJS.particles.array.length; i++){
      var p = secJS.particles.array[i];
      p.draw();
    }

  };

  secJS.fn.particlesEmpty = function(){
    secJS.particles.array = [];
  };

  secJS.fn.particlesRefresh = function(){

    /* init all */
    cancelRequestAnimFrame(secJS.fn.checkAnimFrame);
    cancelRequestAnimFrame(secJS.fn.drawAnimFrame);
    secJS.tmp.source_svg = undefined;
    secJS.tmp.img_obj = undefined;
    secJS.tmp.count_svg = 0;
    secJS.fn.particlesEmpty();
    secJS.fn.canvasClear();

    /* restart */
    secJS.fn.vendors.start();

  };


  /* ---------- secJS functions - particles interaction ------------ */

  secJS.fn.interact.linkParticles = function(p1, p2){

    var c = p1.countur === p2.countur ? 0.6 : 1.2,
        dx = p1.x - p2.x,
        dy = p1.y - p2.y,
        dist = Math.sqrt(dx*dx + dy*dy) * c;

    /* draw a line between p1 and p2 if the distance between them is under the config distance */
    if(dist <= secJS.particles.line_linked.distance){

      var opacity_line = secJS.particles.line_linked.opacity - (dist / (1/secJS.particles.line_linked.opacity)) / secJS.particles.line_linked.distance;

      if(opacity_line > 0){

        /* style */
        var color_line = secJS.particles.line_linked.color_rgb_line;
        secJS.canvas.ctx.strokeStyle = 'rgba('+color_line.r+','+color_line.g+','+color_line.b+','+opacity_line+')';
        secJS.canvas.ctx.lineWidth = secJS.particles.line_linked.width;
        //secJS.canvas.ctx.lineCap = 'round'; /* performance issue */

        /* path */
        secJS.canvas.ctx.beginPath();
        secJS.canvas.ctx.moveTo(p1.x, p1.y);
        secJS.canvas.ctx.lineTo(p2.x, p2.y);
        secJS.canvas.ctx.stroke();
        secJS.canvas.ctx.closePath();

      }

    }

  };






  /* ---------- secJS functions - vendors ------------ */

  secJS.fn.vendors.densityAutoParticles = function(){

    if(secJS.particles.number.density.enable){

      /* calc area */
      var area = secJS.canvas.el.width * secJS.canvas.el.height / 1000;
      if(secJS.tmp.retina){
        area = area/(secJS.canvas.pxratio*2);
      }

      /* calc number of particles based on density area */
      var nb_particles = area * secJS.particles.number.value / secJS.particles.number.density.value_area;

      /* add or remove X particles */
      var missing_particles = secJS.particles.array.length - nb_particles;
      if(missing_particles < 0) secJS.fn.modes.pushParticles(Math.abs(missing_particles));
      else secJS.fn.modes.removeParticles(missing_particles);

    }

  };


  secJS.fn.vendors.checkOverlap = function(p1, position){
    for(var i = 0; i < secJS.particles.array.length; i++){
      var p2 = secJS.particles.array[i];

      var dx = p1.x - p2.x,
          dy = p1.y - p2.y,
          dist = Math.sqrt(dx*dx + dy*dy);

      if(dist <= p1.radius + p2.radius){
        p1.x = position ? position.x : Math.random() * secJS.canvas.w;
        p1.y = position ? position.y : Math.random() * secJS.canvas.h;
        secJS.fn.vendors.checkOverlap(p1);
      }
    }
  };




  secJS.fn.vendors.destroysecJS = function(){
    cancelAnimationFrame(secJS.fn.drawAnimFrame);
    canvas_el.remove();
    secJSDom = null;
  };


  secJS.fn.vendors.draw = function(){

    if(secJS.particles.shape.type == 'image'){

      if(secJS.tmp.img_type == 'svg'){

        if(secJS.tmp.count_svg >= secJS.particles.number.value){
          secJS.fn.particlesDraw();
          if(!secJS.particles.move.enable) cancelRequestAnimFrame(secJS.fn.drawAnimFrame);
          else secJS.fn.drawAnimFrame = requestAnimFrame(secJS.fn.vendors.draw);
        }else{
          //console.log('still loading...');
          if(!secJS.tmp.img_error) secJS.fn.drawAnimFrame = requestAnimFrame(secJS.fn.vendors.draw);
        }

      }else{

        if(secJS.tmp.img_obj != undefined){
          secJS.fn.particlesDraw();
          if(!secJS.particles.move.enable) cancelRequestAnimFrame(secJS.fn.drawAnimFrame);
          else secJS.fn.drawAnimFrame = requestAnimFrame(secJS.fn.vendors.draw);
        }else{
          if(!secJS.tmp.img_error) secJS.fn.drawAnimFrame = requestAnimFrame(secJS.fn.vendors.draw);
        }

      }

    }else{
      secJS.fn.particlesDraw();
      if(!secJS.particles.move.enable) cancelRequestAnimFrame(secJS.fn.drawAnimFrame);
      else secJS.fn.drawAnimFrame = requestAnimFrame(secJS.fn.vendors.draw);
    }

  };


  secJS.fn.vendors.checkBeforeDraw = function(){

    // if shape is image
    if(secJS.particles.shape.type == 'image'){

      if(secJS.tmp.img_type == 'svg' && secJS.tmp.source_svg == undefined){
        secJS.tmp.checkAnimFrame = requestAnimFrame(check);
      }else{
        //console.log('images loaded! cancel check');
        cancelRequestAnimFrame(secJS.tmp.checkAnimFrame);
        if(!secJS.tmp.img_error){
          secJS.fn.vendors.init();
          secJS.fn.vendors.draw();
        }

      }

    }else{
      secJS.fn.vendors.init();
      secJS.fn.vendors.draw();
    }

  };


  secJS.fn.vendors.init = function(){
    /* particles.line_linked - convert hex colors to rgb */
    secJS.particles.line_linked.color_rgb_line = hexToRgb(secJS.particles.line_linked.color);

    /* init canvas + particles */
    secJS.fn.retinaInit();
    secJS.fn.canvasInit();
    secJS.fn.canvasSize();
    secJS.fn.canvasPaint();
    secJS.fn.particlesCreate();
  };


  secJS.fn.vendors.start = function(){

    if(isInArray('image', secJS.particles.shape.type)){
      secJS.tmp.img_type = secJS.particles.shape.image.src.substr(secJS.particles.shape.image.src.length - 3);
      secJS.fn.vendors.loadImg(secJS.tmp.img_type);
    }else{
      secJS.fn.vendors.checkBeforeDraw();
    }

  };


  /* ---------- secJS - start ------------ */
  secJS.fn.vendors.start();
};

/* ---------- global functions - vendors ------------ */

Object.deepExtend = function(destination, source) {
  for (var property in source) {
    if (source[property] && source[property].constructor &&
     source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      arguments.callee(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback){
      window.setTimeout(callback, 1000 / 60);
    };
})();

window.cancelRequestAnimFrame = ( function() {
  return window.cancelAnimationFrame         ||
    window.webkitCancelRequestAnimationFrame ||
    window.mozCancelRequestAnimationFrame    ||
    window.oCancelRequestAnimationFrame      ||
    window.msCancelRequestAnimationFrame     ||
    clearTimeout
} )();

function hexToRgb(hex){
  // By Tim Down - http://stackoverflow.com/a/5624139/3493650
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
     return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
};

function clamp(number, min, max) {
  return Math.min(Math.max(number, min), max);
};

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


/* ---------- particles.js functions - start ------------ */

window.secJSDom = [];

window.securityJS = function(tag_id, params){

  //console.log(params);

  /* no string id? so it's object params, and set the id with default id */
  if(typeof(tag_id) != 'string'){
    params = tag_id;
    tag_id = 'particles-js';
  }

  /* no id? set the id to default id */
  if(!tag_id){
    tag_id = 'particles-js';
  }

  /* secJS elements */
  var secJS_tag = document.getElementById(tag_id),
      secJS_canvas_class = 'particles-js-canvas-el',
      exist_canvas = secJS_tag.getElementsByClassName(secJS_canvas_class);

  /* remove canvas if exists into the secJS target tag */
  if(exist_canvas.length){
    while(exist_canvas.length > 0){
      secJS_tag.removeChild(exist_canvas[0]);
    }
  }

  /* create canvas element */
  var canvas_el = document.createElement('canvas');
  canvas_el.className = secJS_canvas_class;

  /* set size canvas */
  canvas_el.style.width = "100%";
  canvas_el.style.height = "100%";

  /* append canvas */
  var canvas = document.getElementById(tag_id).appendChild(canvas_el);

  /* launch particle.js */
  if(canvas != null){
    secJSDom.push(new secJS(tag_id, params));
  }

};
