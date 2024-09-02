import { Field } from 'formik'
import { useState } from 'react'

import styles from '../style.module.css'

export const PasswordInput = ({ name, placeholder, password, setPassword }: { name: string, placeholder?: string, password: string, setPassword?: (el: string) => void }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <div className={styles.passwordInput}>
            <Field
                name={name}
                type={isOpen ? 'text' : "password"}
                placeholder={placeholder || 'Password'}
                value={password}
                //@ts-ignore
                onChange={(e) => setPassword(e.target.value)}
            />
            <img src={isOpen ? '/assets/view.png' : '/assets/hide.png'} className={styles.passwordEye} onClick={handleSelect} />
        </div>)
}

