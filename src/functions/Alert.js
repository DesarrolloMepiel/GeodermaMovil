import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    // color: 'green',
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const Alert = (status, message) =>{
    Toast.fire({
        icon: status,
        title: message
    })
}

export const AlertOK = (status,message) =>{
    Swal.fire({
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        title: message,
        icon: status,
      });
}