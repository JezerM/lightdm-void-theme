import {
  Signal as SignalClass,
  Greeter as GreeterClass,
  GreeterConfig as GreeterConfigClass,
  ThemeUtils as ThemeUtilsClass,
} from "nody-greeter-types";

class LightDMLanguage {
  code: string;
  name: string;
  territory: string;
  constructor(code: string, name: string, territory: string) {
    this.code = code;
    this.name = name;
    this.territory = territory;
  }
}
class LightDMLayout {
  name: string;
  description: string;
  short_description: string;
  constructor(name: string, description: string, short_description: string) {
    this.name = name;
    this.description = description;
    this.short_description = short_description;
  }
}
class LightDMUser {
  background = "";
  display_name: string;
  home_directory: string;
  image: string;
  language = "";
  layout = "";
  layouts: string[] = [];
  logged_in = false;
  session: string;
  username: string;

  constructor(
    username: string,
    display_name: string,
    image: string,
    session?: string
  ) {
    this.username = username;
    this.display_name = display_name;
    this.image = image;
    this.home_directory = "/home/" + username + "/";
    this.session = session ?? "";
  }
}

class LightDMSession {
  key: string;
  name: string;
  type: string;
  comment: string;
  constructor(key: string, name: string, comment?: string, type?: string) {
    this.key = key;
    this.name = name;
    this.comment = comment ?? "";
    this.type = type ?? "X";
  }
}

class Signal implements SignalClass {
  _name: string;
  _callbacks: Function[] = []; // eslint-disable-line

  constructor(name: string) {
    this._name = name;
  }

  // eslint-disable-next-line
  connect(callback: Function): void {
    if (typeof callback !== "function") return;
    this._callbacks.push(callback);
  }

  // eslint-disable-next-line
  disconnect(callback: Function): void {
    const ind = this._callbacks.findIndex((cb) => {
      return cb === callback;
    });
    if (ind == -1) return;
    this._callbacks.splice(ind, 1);
  }

  // eslint-disable-next-line
  _emit(...args: [...any]) {
    this._callbacks.forEach((cb) => {
      if (typeof cb !== "function") return;
      cb(...args);
    });
  }
}

class Greeter implements GreeterClass {
  mock_password = "mock";

  authentication_complete = new Signal("authentication_complete");
  autologin_timer_expired = new Signal("autologin_timer_expired");
  idle = new Signal("idle");
  reset = new Signal("reset");
  show_message = new Signal("show_message");
  show_prompt = new Signal("show_prompt");
  brightness_update = new Signal("show_message");
  battery_update = new Signal("battery_update");

  authentication_user: string | null = null;
  autologin_guest = false;
  autologin_timeout = 0;
  autologin_user = "";
  batteryData = {
    name: "BAT0",
    level: 85,
    status: "Discharging",
    ac_status: false,
    time: "00:00",
    capacity: 100,
    watt: 0,
  };
  private _brightness = 50;
  get brightness(): number {
    return this._brightness;
  }
  set brightness(quantity: number) {
    if (quantity < 0) quantity = 0;
    else if (quantity > 100) quantity = 100;
    this._brightness = quantity;
  }

  can_access_battery = true;
  can_access_brightness = true;
  can_hibernate = true;
  can_restart = true;
  can_shutdown = true;
  can_suspend = true;

  default_session = "awesome";
  has_guest_account = false;
  hide_users_hint = false;
  hostname = "mock-PC";
  in_authentication = false;
  is_authenticated = false;

  language: LightDMLanguage | null = null;
  languages: LightDMLanguage[] = [
    new LightDMLanguage("en_US.utf8", "English", "USA"),
    new LightDMLanguage("ca_ES.utf8", "Catalan", "Spain"),
    new LightDMLanguage("fr_FR.utf8", "French", "France"),
    new LightDMLanguage("es_NI.utf8", "Spanish", "Nicaragua"),
  ];
  layout = new LightDMLayout("us", "English (US)", "en");
  layouts = [
    new LightDMLayout("us", "English (US)", "en"),
    new LightDMLayout("latam", "Español (Latinoamericano)", "es"),
    new LightDMLayout("at", "German (Austria)", "de"),
    new LightDMLayout("us rus", "Russian (US, phonetic)", "ru"),
  ];
  lock_hint = false;
  remote_sessions = [];
  select_guest_hint = false;
  select_user_hint = "";
  sessions = [
    new LightDMSession(
      "awesome",
      "Awesome wm",
      "Highly configurable framework window manager"
    ),
    new LightDMSession("ubuntu", "Ubuntu", "This session starts Ubuntu"),
    new LightDMSession(
      "ubuntu-wayland",
      "Ubuntu (on Wayland)",
      "This session starts Ubuntu on Wayland",
      "wayland"
    ),
    new LightDMSession("plasma", "Plasma (X11)", "Plasma, by KDE"),
    new LightDMSession("mate", "MATE", "This session logs you into MATE"),
    new LightDMSession(
      "cinnamon",
      "Cinnamon",
      "This session logs you into Cinnamon"
    ),
    new LightDMSession(
      "openbox",
      "Openbox",
      "This session logs you into Openbox"
    ),
  ];
  show_manual_login_hint = true;
  show_remote_login_hint = false;
  users = [
    new LightDMUser("superman", "Clark Kent", "", "ubuntu"),
    new LightDMUser("batman", "Bruce Wayne", "", "cinnamon"),
    new LightDMUser("spiderman", "Peter Parker", "", "awesome"),
  ];

  authenticate(username: string | null) {
    this.authentication_user = username;
    this.in_authentication = true;
    if (username == null) {
      this.show_prompt._emit("login:", 0);
    }
  }

  authenticate_as_guest() {
    return;
  }

  brightnessSet(quantity: number) {
    this.brightness = quantity;
  }
  brightnessIncrease(quantity: number) {
    this.brightness += quantity;
  }
  brightnessDecrease(quantity: number) {
    this.brightness -= quantity;
  }

  cancel_authentication() {
    this.authentication_user = null;
    this.in_authentication = false;
  }
  cancel_autologin() {
    return;
  }

  hibernate() {
    return true;
  }
  restart() {
    return true;
  }
  shutdown() {
    return true;
  }
  suspend() {
    return true;
  }
  respond(response: string) {
    if (!this.in_authentication) return;
    if (this.authentication_user == null) {
      this.authentication_user = response;
      this.show_prompt._emit("Password: ", 1);
    } else {
      if (response === this.mock_password) {
        this.is_authenticated = true;
        this.in_authentication = false;
        this.authentication_complete._emit();
      } else {
        setTimeout(() => {
          this.is_authenticated = false;
          this.authentication_complete._emit();
          this.show_prompt._emit("Password: ", 1);
        }, 3000);
      }
    }
  }

  set_language(language: string): boolean {
    if (this.is_authenticated) {
      this.language =
        this.languages.find((v) => {
          return v.code == language;
        }) ?? null;
      return this.language != null;
    }
    return false;
  }
  start_session(session: string | null): boolean {
    console.log("Session:", session ?? this.default_session);
    return true;
  }
}

class GreeterConfig implements GreeterConfigClass {
  branding = {
    background_images_dir: "/usr/share/backgrounds",
    logo: "/usr/share/web-greeter/themes/default/img/antergos-logo-user.png",
    user_image: "/usr/share/web-greeter/themes/default/img/antergos.png",
  };

  greeter = {
    debug_mode: true,
    detect_theme_errors: true,
    screensaver_timeout: 300,
    secure_mode: true,
    time_language: "",
    theme: "none",
  };

  layouts = [
    new LightDMLayout("us", "English (US)", "en"),
    new LightDMLayout("latam", "Español (Latinoamericano)", "es"),
    new LightDMLayout("at", "German (Austria)", "de"),
    new LightDMLayout("us rus", "Russian (US, phonetic)", "ru"),
  ];

  features = {
    battery: true,
    backlight: {
      enabled: true,
      value: 10,
      steps: 0,
    },
  };
}

let time_language = "";
class ThemeUtils implements ThemeUtilsClass {
  // eslint-disable-next-line
  bind_this(context: Record<string, any>) {
    const excluded_methods = ["constructor"];

    function not_excluded(_method: string, _context: Record<string, unknown>) {
      const is_excluded =
          excluded_methods.findIndex(
            (excluded_method) => _method === excluded_method
          ) > -1,
        is_method = "function" === typeof _context[_method];

      return is_method && !is_excluded;
    }

    for (let obj = context; obj; obj = Object.getPrototypeOf(obj)) {
      // Stop once we have traveled all the way up the inheritance chain
      if ("Object" === obj.constructor.name) {
        break;
      }

      for (const method of Object.getOwnPropertyNames(obj)) {
        if (not_excluded(method, context)) {
          context[method] = context[method].bind(context);
        }
      }
    }

    return context;
  }
  dirlist(
    path: string,
    only_images = true, // eslint-disable-line
    callback: (files: string[]) => void
  ) {
    if ("" === path || "string" !== typeof path) {
      console.error(`theme_utils.dirlist(): path must be a non-empty string!`);
      return callback([]);
    }
    if (null !== path.match(/\/\.+(?=\/)/)) {
      // No special directory names allowed (eg ../../)
      path = path.replace(/\/\.+(?=\/)/g, "");
    }

    try {
      // Should be changed here
      return callback([]);
    } catch (err) {
      console.error(`theme_utils.dirlist(): ${err}`);
      return callback([]);
    }
  }
  // eslint-disable-next-line
  dirlist_sync(path: string, images_only = true): string[] {
    return [];
  }

  get_current_localized_date() {
    const config = window.greeter_config?.greeter;
    const locale = [];

    if (time_language === null) {
      time_language = config?.time_language || "";
    }
    if (time_language != "") {
      locale.push(time_language);
    }

    const optionsDate = { day: "2-digit", month: "2-digit", year: "2-digit" };
    const fmtDate = Intl.DateTimeFormat(locale, optionsDate);
    return fmtDate.format(new Date());
  }
  get_current_localized_time() {
    const config = window.greeter_config?.greeter;
    const locale = [];

    if (time_language === null) {
      time_language = config?.time_language || "";
    }
    if (time_language != "") {
      locale.push(time_language);
    }

    const optionsTime = { hour: "2-digit", minute: "2-digit" };
    const fmtDate = Intl.DateTimeFormat(locale, optionsTime);
    return fmtDate.format(new Date());
  }
}

if (window._ready_event == undefined) {
  window.lightdm = new Greeter();
  window.greeter_config = new GreeterConfig();
  window.theme_utils = new ThemeUtils();
  window._ready_event = new Event("GreeterReady");

  window.lightdm.show_prompt.connect((message: string, type: number) => {
    console.log({ message, type });
  });

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      if (window._ready_event) window.dispatchEvent(window._ready_event);
    }, 2);
  });
}
