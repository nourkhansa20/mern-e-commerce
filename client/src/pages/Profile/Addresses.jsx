import React, { useState } from 'react'
import DeleteIcon from '../../moon-ui/icons/DeleteIcon'
import { useAuthContext } from '../../context/useAuthContext'
import { useDeleteAddress } from '../../hooks/useAddressApi'
import { useToast } from '../../moon-ui/Toast'
import Modal from '../../moon-ui/Modal'
import { PrimaryButton } from '../../moon-ui/Buttons'
import AddressForm from '../../components/Form/AddressForm'

const Addresses = () => {

    const { user } = useAuthContext()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isCreateAddressModalOpen, setIscreateAddressModalOpen] = useState(false)
    const [deleteAdressId, setDeleteAdressId] = useState()

    const deleteMutation = useDeleteAddress()
    const addToast = useToast()
    const { refetchUser } = useAuthContext()

    const handleDeleteAdress = () => {
        deleteMutation.mutate(deleteAdressId, {
            onSuccess: () => {
                addToast('Adress deleted successfully', 'success', 2000)
                refetchUser()
            },
            onError: (err) => {
                addToast(err, 'error', 2000)
            }
        })
        closeDeleteModal()
    }

    const openDeleteModal = (addressId) => {
        setDeleteAdressId(addressId)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => {
        setDeleteAdressId()
        setIsDeleteModalOpen(false)
    }


    return (
        <div>
            <div className='mb-5 flex justify-between'>
                <h2 className='text-4xl font-semibold'>Addresses</h2>
                <PrimaryButton width='w-fit' onClick={() => setIscreateAddressModalOpen(true)}>Create address</PrimaryButton>
            </div>
            <div className='grid xl:grid-cols-2 grid-cols-1 gap-4'>
                {
                    user.addresses.map((address) => (
                        <AddressCard address={address} onClick={openDeleteModal} />
                    ))
                }

                <Modal open={isDeleteModalOpen} onClose={closeDeleteModal} className='mx-2'>
                    <div className='flex flex-col gap-3 justify-center items-center'>
                        <Modal.Title>Delete Address</Modal.Title>
                        <p className='text-center'>Are you sure you want to delete this address?</p>
                        <PrimaryButton onClick={handleDeleteAdress}>Delete</PrimaryButton>
                    </div>
                </Modal>

                <Modal open={isCreateAddressModalOpen} onClose={() => setIscreateAddressModalOpen(false)} className='gap-4'>
                    <Modal.Title >Create Address</Modal.Title>
                    <AddressForm onClick={() => setIscreateAddressModalOpen(false)} />
                </Modal>
            </div>
        </div>
    )
}

export default Addresses

const AddressCard = ({ address, onClick }) => {
    const { title, country, city, building, floor, postalCode, street } = address
    const thStyle = 'font-semibold text-start p-1'

    return (
        <div className='lg:w-[55ex] rounded-md border-[1px] border-gray-200 px-5 py-3'>

            <div className='flex justify-between items-center mb-3'>
                <h2 className='font-bold text-2xl'>{title}</h2>
                <DeleteIcon
                    onClick={() => onClick(address._id)}
                    className='w-[2.7ex] cursor-pointer hover:fill-primary transition-all duration-300'
                />
            </div>

            <table>
                <tbody>
                    <tr>
                        <th className={thStyle} >Counrty</th>
                        <td>{country}</td>
                    </tr>
                    <tr>
                        <th className={thStyle} >City</th>
                        <td>{city}</td>
                    </tr>
                    <tr>
                        <th className={thStyle} >Street</th>
                        <td>{street}</td>
                    </tr>
                    <tr>
                        <th className={thStyle} >Building</th>
                        <td>{building}</td>
                    </tr>
                    <tr>
                        <th className={thStyle} >Floor</th>
                        <td>{floor}</td>
                    </tr>
                    <tr>
                        <th className={thStyle} >Post code</th>
                        <td>{postalCode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


