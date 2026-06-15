// আপনার ফায়ারবেজ ওয়েব অ্যাপ কনফিগারেশন এখানে বসান
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrRxhIRCxhPJo5wt4p-ELE2ZU1rVdkmVo",
  authDomain: "light-own.firebaseapp.com",
  databaseURL: "https://light-own-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "light-own",
  storageBucket: "light-own.firebasestorage.app",
  messagingSenderId: "815875554089",
  appId: "1:815875554089:web:e17fa5c6c782c267f99538"
};


// ফায়ারবেজ ইনিশিয়ালাইজেশন
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// ডাটাবেজ থেকে রিয়েল-টাইমে লাইটের অবস্থা ট্র্যাক করা
const lights = ['light1', 'light2', 'light3'];

lights.forEach(light => {
    database.ref('light_control/' + light).on('value', (snapshot) => {
        const val = snapshot.val();
        const checkbox = document.getElementById(`${light}-switch`);
        const statusText = document.getElementById(`${light}-status`);

        if (val === 1) {
            checkbox.checked = true;
            statusText.innerText = "Status: ON";
            statusText.style.color = "#2ecc71";
        } else {
            checkbox.checked = false;
            statusText.innerText = "Status: OFF";
            statusText.style.color = "#e74c3c";
        }
    });
});

// ওয়েব অ্যাপ থেকে লাইট অন/অফ করার ফাংশন
function toggleLight(lightName, isChecked) {
    const valueToSend = isChecked ? 1 : 0;
    database.ref('light_control/' + lightName).set(valueToSend)
    .catch(error => {
        console.error("Error updating database: ", error);
    });
}
