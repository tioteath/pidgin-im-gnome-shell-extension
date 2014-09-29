// -*- mode: js2; indent-tabs-mode: nil; js2-basic-offset: 8 -*-

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

const Gettext = imports.gettext.domain('gnome-shell-extension-pidgin');
const _ = Gettext.gettext;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;


function init() {
	Convenience.initTranslations();
}

const PidginPrefsWidget = new GObject.Class({
	Name: 'Pidgin.Prefs.Widget',
	GTypeName: 'PidginPrefsWidget',
	Extends: Gtk.Box,

	_init: function(params) {
		this.parent(params);
		this._settings = Convenience.getSettings();

		this.margin = 24;
		this.spacing = 30;
                let msg_label = new Gtk.Label({
			label: _('Message tray integration'),
			hexpand: true,
			halign: Gtk.Align.START});
		let msg_checkbox = new Gtk.Switch({
			halign: Gtk.Align.END});
	        msg_checkbox.set_active(this._settings.get_boolean('enable-message-tray'));
		msg_checkbox.connect(
			'notify::active',
			Lang.bind(this, function(check) {
				this._settings.set_boolean('enable-message-tray', check.get_active());
			})
		);
		this.add(msg_label);
		this.add(msg_checkbox);

	        let buddy_label = new Gtk.Label({
			label: _('Buddies search provider'),
			hexpand: true,
			halign: Gtk.Align.START});
		let buddy_checkbox = new Gtk.Switch({
			halign: Gtk.Align.END});
		buddy_checkbox.set_active(this._settings.get_boolean('enable-search-provider'));
		buddy_checkbox.connect(
			'notify::active',
			Lang.bind(this, function(check) {
				this._settings.set_boolean('enable-search-provider', check.get_active());
			})
		);
		this.add(buddy_label);
		this.add(buddy_checkbox);
	},
});


function buildPrefsWidget() {
	let widget = new PidginPrefsWidget();
	widget.show_all();

	return widget;
}
