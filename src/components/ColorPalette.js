import React, { useState } from 'react'
// import { Palette } from 'react-palette';
import styles from './colorpalette.style.module.css'

const ColorPalette = () => {

    const [imageSrc, setImageSrc] = useState('');
    const [palette, setPalette] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            setImageSrc(dataUrl);
        };
        reader.readAsDataURL(file);
    };
    return (
        <div className={styles.container}>
            <h2>Upload Image to Extract Color Palette</h2>
            <input type="file" accept="image/*" onChange={handleFileUpload} />

            <div className={styles.resultContainer}>
                <div className={styles.imgContainer}>
                    <img className={styles.image} src={imageSrc} alt="Uploaded Image" />
                </div>
                {imageSrc && (<Palette src={imageSrc}>
                    {({ data, loading, error }) => {
                        if (loading) return <div>Loading...</div>;
                        if (error) return <div>Error: {error.message}</div>;
                        setPalette(data);
                        return (
                            <div>
                                <h3>Color Palette</h3>
                                <div className={styles.palette}>
                                    {Object.keys(data).map((key) => (
                                            <div key={key} style={{ backgroundColor: data[key], width: '100px', height: '100px', padding:10, borderRadius:10 }}>
                                                {key}
                                                <div>{data[key]}</div>
                                            </div>
                                    ))}
                                </div>
                            </div>
                        );
                    }}
                </Palette>
                )}</div>
        </div>
    )
}

export default ColorPalette