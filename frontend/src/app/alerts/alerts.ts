import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";
// Icons: success, error, warning, info, question
// position: top, top-start, top-end, center, center-start, center-end, bottom, bottom-start, or bottom-end

export const YesNoAlert = async (
    icon: SweetAlertIcon = 'warning',
    title: string = '¿Estas seguro?',
    description: string = 'Esta accion no se puede deshacer',
    confirmDescription: string = 'Confirmar',
    cancelDescription: string = 'Cancelar'
) => {
    const result = await Swal.fire({
        title: title,
        text: description,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmDescription,
        cancelButtonText: cancelDescription
    });
    return result.isConfirmed;
};

export const SmallIconAllert = (icon: SweetAlertIcon = "success", text: string = 'Exito', timer: number = 1500, position: SweetAlertPosition = 'top-end') => {
    const Toast = Swal.mixin({
        toast: true,
        position: position,
        showConfirmButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    Toast.fire({
        icon: icon,
        title: text
    });
}
