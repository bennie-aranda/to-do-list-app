document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.querySelector('.settings-btn').addEventListener('click', function() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('saveSettingsBtn').addEventListener('click', function() {
    const selectedFormat = document.querySelector('input[name="timeFormat"]:checked').value;
    localStorage.setItem('timeFormat', selectedFormat);
    document.getElementById('settingsModal').style.display = 'none';
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const timeInput = document.getElementById('timeInput');
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;
    const timeFormat = localStorage.getItem('timeFormat') || '24';

    if (taskText === '' || taskDate === '') {
        alert('Please enter a task and select a date.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const formattedDate = formatDate(taskDate);
    const formattedTime = taskTime ? formatTime(taskTime, timeFormat) : '';

    const taskContent = document.createElement('span');
    taskContent.textContent = formattedTime ? `${taskText} - ${formattedDate} ${formattedTime}` : `${taskText} - ${formattedDate}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
        taskList.removeChild(li);
    });

    taskInfo.appendChild(taskContent);
    taskInfo.appendChild(deleteBtn);
    li.appendChild(taskInfo);
    li.addEventListener('click', function () {
        li.classList.toggle('complete');
    });
    taskList.appendChild(li);

    taskInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
}

function formatTime(timeString, format) {
    let [hours, minutes] = timeString.split(':');
    hours = parseInt(hours);

    if (format === '12') {
        let amPm = hours >= 12 ? 'PM' : 'AM';
        if (hours > 12) hours -= 12;
        if (hours === 0) hours = 12;  // Special case for 12 AM
        return `${hours}:${minutes} ${amPm}`;
    } else {
        // For 24-hour format, ensure 2 digits for hours
        return `${hours < 10 ? '0' : ''}${hours}:${minutes}`;
    }
}
