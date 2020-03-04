import './tablePdfViewer.css'
import React, {Component} from 'react';
import {Document, Page, PDFViewer, StyleSheet, Text, View, Image} from "@react-pdf/renderer";

class TablePdfViewer extends Component {
    render() {
        const {tableData, pdfViewr, reportTitle} = this.props
        const styles = StyleSheet.create({
            page: {
                alignItems: 'center',
                backgroundColor: '#ffffff'
            },
            section: {
                display: 'flex',
                flexDirection: 'row'
            },
            sectionTop: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center'
            },
            headerText: {
                fontSize: 11,
                width: 75,
                paddingVertical: 5,
                borderBottomWidth: 1,
                marginHorizontal: 3,
                textTransform: 'capitalize',
            },
            bodyText: {
                color: '#444',
                fontSize: 10,
                width: 75,
                paddingVertical: 5,
                borderBottomWidth: 1,
                marginHorizontal: 3,
                borderBottomColor: '#888',
                textTransform: 'capitalize',
            }
        });
        let table_headers = tableData.length > 0 && Object.keys(tableData[0]).map((item, index) => {
            return (
                <>
                    {item !== 'id' && <Text key={index} style={styles.headerText}>
                        {item.replace('_', " ")}
                    </Text>}
                </>
            )})
        let table_body = tableData.length > 0 && tableData.map((items, index) => {
            return (
                <>
                    <Text style={{...styles.bodyText, width: 30}}>{index + 1}</Text>
                    {Object.keys(tableData[0]).map((item, index) => (
                        <>
                            {item !== 'id' && <Text key={index + 10} style={styles.bodyText}>
                                {items[item]}
                            </Text>}
                        </>
                    ))}
                </>
            )})
        return (
            <div className={'ui-pdf w-100'}>
                <div className="ui-close" onClick={pdfViewr}>
                    <i className="fas fa-times-circle"></i>
                </div>
                <PDFViewer>
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <View style={styles.sectionTop}>
                                <Image style={{width: 65, marginBottom: 15}} src={process.env.PUBLIC_URL + '/media/image/logo.png'} />
                                <Text style={{...styles.header, marginBottom: 25, color: '#0f5ea8'}}>{reportTitle}</Text>
                            </View>
                            <View style={styles.section}>
                                <Text style={{...styles.headerText, width: 30}}>No</Text>
                                {table_headers}
                            </View>
                            <View style={styles.section}>
                                {table_body}
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        );
    }
}

export default TablePdfViewer;