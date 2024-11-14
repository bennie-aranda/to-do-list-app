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
    const amPmSelect = document.getElementById('amPmSelect');
    const taskText = taskInput.value.trim();
    const taskDate = dateInput.value;
    const taskTime = timeInput.value;
    const amPm = amPmSelect.value;

    if (taskText === '' || taskDate === '') {
        alert('Please enter a task and select a date.');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const formattedDate = formatDate(taskDate);
    const timeFormat = localStorage.getItem('timeFormat') || '24';
    const formattedTime = taskTime ? formatTime(taskTime, amPm, timeFormat) : '';

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

function formatTime(timeString, amPm, format) {
    if (format === '12') {
        const [hours, minutes] = timeString.split(':');
        let hour = parseInt(hours);
        if (amPm === 'PM' && hour < 12) {
            hour += 12;
        } else if (amPm === 'AM' && hour === 12) {
            hour = 0;
        }
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${amPm}`;
    }
    return timeString; // 24-hour format
}
