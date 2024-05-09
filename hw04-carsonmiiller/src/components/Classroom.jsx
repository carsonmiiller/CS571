import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import Student from "./Student"
import $ from "jquery";

let STUDENTS = [];

const Classroom = () => {
    const [shownStudents, setShownStudents] = useState([])
    const [nameSearch, setNameSearch] = useState("")
    const [majorSearch, setMajorSearch] = useState("")
    const [intSearch, setIntSearch] = useState("")
    const url = "https://cs571.org/s23/hw4/api/students"

    function resetFields(){
        setShownStudents(STUDENTS)
        setNameSearch("")
        setMajorSearch("")
        setIntSearch("")
    }

    // reload page
    useEffect(() => {
        fetch(url, {
            method: "GET",
            headers: {
                "X-CS571-ID": "bid_f6cf574eb476d5ada941"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setShownStudents(data)
                STUDENTS = data
            })
            .catch(error => console.error(error))
    }, [])

    // live update search
    useEffect(() => {
        let filteredList = STUDENTS.filter((STUDENT) => {
            let STUDENT_name = STUDENT.name.first + " " + STUDENT.name.last
            return STUDENT_name.toLowerCase().includes(nameSearch.toLowerCase()) &&
                    STUDENT.major.toLowerCase().includes(majorSearch.toLowerCase()) &&
                    STUDENT.interests.some((int) => int.toLowerCase().includes(intSearch.toLowerCase()))
        });
        setShownStudents(filteredList);
    }, [nameSearch, majorSearch, intSearch])

    $(document).ready(function(){
        $("#hide").click(function(){
          $("Form").hide();
        });
        $("#show").click(function(){
          $("Form").show();
        });
        $("#hide_students").click(function(){
            $("#students").fadeOut();
        });
        $("#show_students").click(function(){
            $("#students").fadeIn();
        });
        $("#hide_buttons").click(function(){
            $("#hide").fadeOut();
            $("#show").fadeOut();
            $("#hide_students").fadeOut();
            $("#show_students").fadeOut();
        });
        $("#show_buttons").click(function(){
            $("#hide").fadeIn();
            $("#show").fadeIn();
            $("#hide_students").fadeIn();
            $("#show_students").fadeIn();
        });
      });

    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={nameSearch} onChange={(s) => setNameSearch(s.target.value)}/>
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={majorSearch} onChange={(s) => setMajorSearch(s.target.value)}/>
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={intSearch} onChange={(s) => setIntSearch(s.target.value)}/>
            <br />
            <Button variant="neutral" onClick={resetFields}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Button id="hide_buttons">Hide Buttons</Button>
            <Button id="show_buttons">Show Buttons</Button>
            <Button id="hide">Hide Form</Button>
            <Button id="show">Show Form</Button>
            <Button id="hide_students">Hide Students</Button>
            <Button id="show_students">Show Students</Button>
        </Container>
        <Container fluid id="students">
            <Row>
                {
                    shownStudents.map(student => <Col key={student.id} xs={12} sm={6} md={4} lg={3} xl={2}><Student name={student.name} major={student.major} numCredits={student.numCredits} fromWisconsin={student.fromWisconsin} interests={student.interests}/></Col> )
                }
            </Row>
        </Container>
    </div>

}


export default Classroom;