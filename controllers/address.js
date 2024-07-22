// controllers/address.js
import { Address } from '../database/models/Address.js';
import { User } from '../database/models/User.js';

// Create a new address
export const createAddress = async (req, res) => {
    const { userId, ...addressData } = req.body;

    try {
        const address = new Address(addressData);
        await address.save();

        // Add the address to the user's addresses array
        await User.findByIdAndUpdate(userId, { $push: { addresses: address._id } });

        res.status(201).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all addresses
export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json(addresses);
    } catch (error) {
        res.status500().json({ message: error.message });
    }
}

// Get an address by ID
export const getAddressById = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Update an address
export const updateAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json(address);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Delete an address
export const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findByIdAndDelete(req.params.id);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.status(200).json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
