/**
 * TODO Your code goes below here!
 * You may find the helper functions helpful.
 */
let STUDENTS = [];

const url = "https://cs571.org/s23/hw3/api/students"
fetch(url, {
	method: "GET",
	headers: {
		"X-CS571-ID": "bid_f6cf574eb476d5ada941"
	}
})
	.then((res) => res.json())
	.then((data) => {
		console.log(data)
		STUDENTS = data
		document.getElementById('students').innerHTML = (buildStudentsHtml(STUDENTS))
	})
	.catch(error => console.error(error))

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map((stud) => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
	html += `<h4>Major: ${stud.major}</h4>`;
	html += `<p>Credits: ${stud.numCredits}</p>`;
	if(stud.fromWisconsin)
		html += `<p>${stud.name.first} <strong>is</strong> from Wisconsin</p>`;
	else
		html += `<p>${stud.name.first} <strong>is not</strong> from Wisconsin</p>`;
	html += `<p>They have ${stud.interests.length} interests including...</p><ul>`;
	stud.interests.forEach((int) => {
		html += `<li>${int}</li>`
	});	
	html += `</ul></div>`;
	return html;
}

document.getElementById("search-btn").addEventListener("click", () => {
	let searchName = document.getElementById("search-name").value
	let searchMajor = document.getElementById("search-major").value
	let searchInterest = document.getElementById("search-interest").value
	let filteredList = STUDENTS.filter((STUDENT) => {
		let STUDENT_name = STUDENT.name.first + " " + STUDENT.name.last
		return STUDENT_name.toLowerCase().includes(searchName) &&
				STUDENT.major.toLowerCase().includes(searchMajor) &&
				STUDENT.interests.some((int) => int.includes(searchInterest))
	});
	document.getElementById('students').innerHTML = buildStudentsHtml(filteredList)
});

document.getElementById("reset-search-btn").addEventListener("click", () => {
	document.getElementById("search-name").value = ""
	document.getElementById("search-major").value = ""
	document.getElementById("search-interest").value = ""
	document.getElementById('students').innerHTML = (buildStudentsHtml(STUDENTS))
});