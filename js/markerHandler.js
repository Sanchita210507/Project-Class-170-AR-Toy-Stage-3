AFRAME.registerComponent("marker-handler", {
    init:function(){

        this.el.addEventListener("markerFound", ()=>{
          var markerId = this.el.id;
            this.handleMarkerFound(toys, markerId);
        })

        this.el.addEventListener("markerLost", ()=>{
            this.handleMarkerLost();
        })
      
    },

    handleMarkerFound : function(toys, markerId){
    
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var ratingButton = document.getElementById("rating-button")
        var orderButton = document.getElementById("order-button")

        ratingButton.addEventListener("click", ()=>{

        swal("Please provide your feedback here :)", {
        content: "input",
        })
        .then((value) => {
        swal(`Your feedback: ${value}   
          Thanks for your feedback!`);
        });
        })

        orderButton.addEventListener("click", ()=>{

            swal({
                title: "Order Confirmation",
                text: "Please confirm your order : Hydraulic Crane",
                icon: "./assets/order.png",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Bravo! Your order is placed!!", {
                    icon: "success",
                  });
                } else {
                  swal("Please check your order again.");
                }
              });
        })
  


    // Changing Model scale to initial scale
    var toy = toys.filter(toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);
  },
  getToys: async function() {
    return await firebase
      .firestore()
      .collection("toys")
      .get()
      .then(snap => {
        return snap.docs.map(doc => doc.data());
      });
  },

    handleMarkerLost : function(){

        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";

    },
})