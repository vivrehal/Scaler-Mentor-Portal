const marksheet=(student, total)=>{
    const html= 
    `
        <!DOCTYPE html>
            <html>
            <head>
                <title>Student Report Card</title>
                <h2> Your Report Card </h2>
            </head>
            <body>
                <table style="font-family: Arial; font-size: 18px; border-collapse: collapse;">
                    <thead>
                        <tr style="font-weight: bold; text-align: center; background: #625D5D; color: white;">
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Course</td>
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Marks</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background: #D1D0CE;">
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Viva</td>
                            <td id="vivaMarks" style="border: 1px solid #726E6D; padding: 15px;">${student.marks.Viva}</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Ideation</td>
                            <td id="ideationMarks" style="border: 1px solid #726E6D; padding: 15px;">${student.marks.Ideation}</td>
                        </tr>
                        <tr style="background: #D1D0CE;">
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Execution</td>
                            <td id="executionMarks" style="border: 1px solid #726E6D; padding: 15px;">${student.marks.Execution}</td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Presentation</td>
                            <td id="presentationMarks" style="border: 1px solid #726E6D; padding: 15px;">${student.marks.Presentation}</td>
                        </tr>
                        <tr style="background: #D1D0CE;">
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Remarks</td>
                            <td id="remarks" style="border: 1px solid #726E6D; padding: 15px;">${student.marks.Remarks}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr style="font-weight: bold; text-align: right;">
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">Total</td>
                            <td id="totalMarks" colspan="1" style="border: 1px solid #726E6D; padding: 15px;">${total}</td>
                        </tr>
                        <tr style="font-weight: bold; text-align: right;">
                            <td colspan="2" style="border: 1px solid #726E6D; padding: 15px;">GPA</td>
                            <td id="gpa" colspan="1" style="border: 1px solid #726E6D; padding: 15px;">${(total/40)*10}</td>
                        </tr>
                    </tfoot>
                </table>
            </body>
            </html>              
    `
    return html;
}

export default marksheet;