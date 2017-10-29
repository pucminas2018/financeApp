import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * A simple settings/config class for storing key/value pairs with persistence.
 */
@Injectable()
export class Registration {
  private REGISTRATION_KEY: string = '_registration';

  registration: any;

  _defaults: any;
  _readyPromise: Promise<any>;

  constructor(public storage: Storage, defaults: any) {
    this._defaults = defaults;
  }

  load() {
    return this.storage.get(this.REGISTRATION_KEY).then((value) => {
      if (value) {
        this.registration = value;
        return this._mergeDefaults(this._defaults);
      } else {
        return this.setAll(this._defaults).then((val) => {
          this.registration = val;
        })
      }
    });
  }

  _mergeDefaults(defaults: any) {
    for (let k in defaults) {
      if (!(k in this.registration)) {
        this.registration[k] = defaults[k];
      }
    }
    return this.setAll(this.registration);
  }

  merge(registration: any) {
    for (let k in registration) {
      this.registration[k] = registration[k];
    }
    return this.save();
  }

  setValue(key: string, value: any) {
    this.registration[key] = value;
    return this.storage.set(this.REGISTRATION_KEY, this.registration);
  }

  setAll(value: any) {
    return this.storage.set(this.REGISTRATION_KEY, value);
  }

  getValue(key: string) {
    return this.storage.get(this.REGISTRATION_KEY)
      .then(registration => {
        return registration[key];
      });
  }

  save() {
    return this.setAll(this.registration);
  }

  get allRegistration() {
    return this.registration;
  }
}
