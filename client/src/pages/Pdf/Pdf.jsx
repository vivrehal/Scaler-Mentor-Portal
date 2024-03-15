import React from 'react'
import { Document, Page, Text, StyleSheet, View,} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    body: {
        flexDirection: "column",    
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        marginBottom: 20,
        flexDirection: "column",
        flex:1,
        color: 'black',
        padding: 10,
        border: 1,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "center",
    },
    header:{
        textAlign: 'center',
        marginBottom: 10,
    }
})


const Pdf = ({mentor}) => {

    console.log(mentor.studentList)
    return (
        <>
            <Document>
                <Page size="A4">
                        <Text style={styles.text}>Mentees Marksheet</Text>
                        {
                        mentor?.studentList?.map(student => {
                            return(
                                <View style={styles.wrapper} key={student._id}>
                                    <Text style={styles.text}>
                                       ID : {student.studentId} 
                                    </Text>
                                    <Text style={styles.text}>
                                       Name : {student.studentName} 
                                    </Text>
                                    <Text style={styles.text}>
                                       Email : {student.email}
                                    </Text>
                                    <Text style={styles.text}>
                                        Viva : {student?.marks?.Viva}
                                    </Text>
                                    <Text style={styles.text}>
                                        Ideation : {student?.marks?.Ideation}
                                    </Text>
                                    <Text style={styles.text}>
                                        Execution : {student?.marks?.Execution}
                                    </Text>
                                    <Text style={styles.text}>
                                        Presentation : {student?.marks?.Presentation}
                                    </Text>
                                    <Text style={styles.text}>
                                        Remarks : {student?.Remarks}
                                    </Text>
                                    <Text style={styles.text}>
                                        Total : {student.marks.Viva + student.marks.Ideation + student.marks.Execution + student.marks.Presentation}
                                    </Text>
                                    <Text style={styles.text}>
                                        GPA : {((student.marks.Viva + student.marks.Ideation + student.marks.Execution + student.marks.Presentation)/40)*10}
                                    </Text>
                                    
                                </View>


                            )
                        })
                        }
                </Page>
            </Document>
        </>
    )
}





export default Pdf
