class Preloader {
    constructor(id) {
        this.isLocked = false;
        this.el = document.querySelector(id);
        this.el.onclick = (event) => {
            event.preventDefault();
            event.stopPropagation();
            return false;
        };
    }

    lock() {
        this.isLocked = true;
    }

    unlock() {
        this.isLocked = false;
    }

    show(callback) {
        if (this.isLocked) return false;
        this.el.classList.add("b-preloader--active");
        if (callback) callback();
    }

    hide(callback) {
        if (this.isLocked) return false;
        this.el.classList.remove("b-preloader--active");
        if (callback) callback();
    }

}