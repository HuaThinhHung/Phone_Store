class Validation {
    constructor() {
        this.getEle = (id) => document.getElementById(id);
    };

    checkEmpty(value, idNoti, mess) {
        if (value === "") {
            this.getEle(idNoti).innerHTML = mess;
            this.getEle(idNoti).style.display = "block";
            this.getEle(idNoti).style.color = "red";
            return false;
        }
        this.getEle(idNoti).innerHTML = "";
        this.getEle(idNoti).style.display = "none";
        return true;
    };

    checkIdExist(id, idNoti, mess, arr) {
        if (!Array.isArray(arr)) return true;
        const isExist = arr.some(item => item.id === id || item._id === id);
        if (isExist) {
            this.getEle(idNoti).innerHTML = mess;
            this.getEle(idNoti).style.display = "block";
            this.getEle(idNoti).style.color = "red";
            return false;
        }
        this.getEle(idNoti).innerHTML = "";
        this.getEle(idNoti).style.display = "none";
        return true;
    };

    checkString(value, idNoti, mess) {
        const regex = /^[\p{L}\d\s]+$/u;
        if (!regex.test(value)) {
            this.getEle(idNoti).innerHTML = mess;
            this.getEle(idNoti).style.display = "block";
            this.getEle(idNoti).style.color = "red";
            return false;
        }
        this.getEle(idNoti).innerHTML = "";
        this.getEle(idNoti).style.display = "none";
        return true;
    };

    checkCharacterLength(value, idNoti, mess, min, max) {
        if (value.length < min || value.length > max) {
            this.getEle(idNoti).innerHTML = mess;
            this.getEle(idNoti).style.display = "block";
            this.getEle(idNoti).style.color = "red";
            return false;
        }
        this.getEle(idNoti).innerHTML = "";
        this.getEle(idNoti).style.display = "none";
        return true;
    };

    checkSelectOption(selectId, idNoti, mess) {
        const value = this.getEle(selectId).value;
        if (!value) {
            this.getEle(idNoti).innerHTML = mess;
            this.getEle(idNoti).style.display = "block";
            this.getEle(idNoti).style.color = "red";
            return false;
        }
        this.getEle(idNoti).innerHTML = "";
        this.getEle(idNoti).style.display = "none";
        return true;
    };
    checkPrice(value, idError, message) {
        const regex = /^\d{2,20}$/;
        if (!regex.test(value)) {
            document.getElementById(idError).innerText = message;
            return false;
        }
        document.getElementById(idError).innerText = "";
        return true;
    }
};
export default Validation;
