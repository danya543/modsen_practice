const defCenter = {
    lat: 53.897,
    lng: 27.555
};

export const getLocation = () => {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude: lat, longitude: lng } = pos.coords;
                resolve({ lat, lng })
            },
                () => {
                    reject(defCenter);
                },
            );
        } else {
            reject(defCenter);
        }
    })
}