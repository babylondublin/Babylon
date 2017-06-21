var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Babylonian Model
 * ==========
 */
var Babylonian = new keystone.List('Babylonian');

Babylonian.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, unique: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Babylonian.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Relationships
 */
Babylonian.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */
Babylonian.defaultColumns = 'name, email, isAdmin';
Babylonian.register();
