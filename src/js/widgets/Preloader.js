class Preloader {
    constructor(className) {
        this.isLocked = false;
        this.el = document.querySelector(className);
    }

    lock() {
        this.isLocked = true;
    }

    unlock() {
        this.isLocked = false;
    }

    show(callback) {
        if (this.isLocked) return false;
        this.el.classList.add("isActive");
        if (callback) callback();
    }

    hide(callback) {
        if (this.isLocked) return false;
        this.el.classList.remove("isActive");
        if (callback) callback();
    }

}