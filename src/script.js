const smt = document.getElementById('Sbmt');
const ShowStudentRecord = document.getElementById('S_S_R');


const Student_data = {                                                          //Created the object for all the record entry
    student_first_name : '',
    student_last_name : '',
    Student_ID : '',
    Student_Email : '',
    Student_Phone : ''
}

const get_value = () => {                                                           //Assign the value in object values once we enter all the detail and hit enter                                  
    Student_data.student_first_name = document.getElementById('FNM').value;
    Student_data.student_last_name = document.getElementById('Last_name').value;
    Student_data.Student_ID = document.getElementById('St_id').value;
    Student_data.Student_Email = document.getElementById('st_emil').value;
    Student_data.Student_Phone = document.getElementById('St_phn').value;


}



smt.addEventListener('click',(e)=>{                                         //Add eventlistner once hit submit it will validate the entry and after that it store the value in Local storage making Student ID as a Key all student record as value. 
    e.preventDefault();
    get_value();

    if(Student_data.student_first_name==''  || Student_data.student_last_name =='' || Student_data.Student_ID == '' || Student_data.Student_Email =='' || Student_data.Student_Phone == ''){
        alert('Please fill all the field');
        return;
    }

    if (!Student_data.Student_Email.includes("@")) {
        alert('Please enter valid Email ID');
        return;
      }

    if(Student_data.Student_Phone.length <= 9 || Student_data.Student_Phone.length >= 11 ){
        alert('Enter 10 digit phone number');
        return;
    }

    document.getElementById('FNM').value = '';
    document.getElementById('Last_name').value  ='';
    document.getElementById('St_id').value ='';
    document.getElementById('st_emil').value ='';
    document.getElementById('St_phn').value ='';
    localStorage.setItem(`${Student_data.Student_ID}`, JSON.stringify(Student_data));
    
});

ShowStudentRecord.addEventListener('click',()=>{                  //Once Show record button hit this event listner calls and it will show the record.
    let cards = '';
    const sRecord = document.getElementById('Student_record');
    // console.log(localStorage.length);
    if(localStorage.length == 0){
        cards += `
            <div class="bg-amber-400 p-3 m-2 rounded-3xl">
            <p>No Record Found</p>
            </div>`;
            sRecord.innerHTML = cards;
    }
    else{
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));
      
        // console.log(value);
        

        cards += `
            <div class="bg-amber-400 p-3 m-2 rounded-3xl">
                <p><strong>Student ID </strong> : ${value.Student_ID}</p>
                <p><strong>Name</strong> : ${value.student_first_name} ${value.student_last_name}</p>
                <p><strong>Email</strong> : ${value.Student_Email}</p>
                <p><strong>Phone Number</strong> : ${value.Student_Phone}</p>
                <button class="bg-amber-950 text-white w-full rounded-2xl m-2" onclick="deleteData(${value.Student_ID})">Delete</button>
            </div>`;
            sRecord.innerHTML = cards;
      }}
})

function deleteData(Delete_student_record){                                              //delete the record from local storage and reload the page
    localStorage.removeItem(Delete_student_record);
    alert(`Student ID - ${Delete_student_record} Record has been deleted`);
    window.location.reload();
}