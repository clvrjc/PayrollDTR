const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 3000
    });

function sweetAlert(){
    Swal.fire({
        imageUrl: 'https://normi-dtr-payroll.herokuapp.com/static/dist/img/avatar5.png',
        imageHeight: 200,
        imageAlt: "Profile Photo",

        title: 'Daily Time Record',
        html:
        'TIME IN | TIME OUT',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Retry'
    }).then((res) => {
        //{isConfirmed: true, isDenied: false, isDismissed: false, value: true, dismiss: 'backdrop' || dismiss: 'cancel'}
        if(res.isConfirmed){
            //trap later on
            //add api here axios or ajax
            TAlert('success','Successfully Time In')
            console.log('confirmed')
        }
        if(res.isDismissed){
            if(res.dismiss === "backdrop"){
                alert()
            }
        }
    })
}


function TAlert(icon, msg){
    Toast.fire({
        icon: icon,
        html: `<p>${msg}<p>`
    })
}

sweetAlert()
        
