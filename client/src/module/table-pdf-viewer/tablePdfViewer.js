import './tablePdfViewer.css'
import React, {Component} from 'react';
import {Document, Page, PDFViewer, StyleSheet, Text, View, Image} from "@react-pdf/renderer";

class TablePdfViewer extends Component {
    render() {
        const {tableData, pdfViewr, reportTitle, admin} = this.props
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
                fontSize: 9,
                paddingVertical: 2,
                borderBottomWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: 1,
                paddingHorizontal: 5,
                textTransform: 'capitalize',
                backgroundColor: '#ccc'
            },
            document: {
                width: 500,
                overflow: 'scroll'
            },
            bodyText: {
                color: '#444',
                fontSize: 8,
                minWidth: 45,
                maxWidth: 45,
                paddingVertical: 2,
                borderBottomWidth: 1,
                paddingHorizontal: 5,
                borderRightWidth: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                borderBottomColor: '#888',
                textTransform: 'capitalize',
            }
        });
        let table_headers = tableData.length > 0 && Object.keys(tableData[0]).map((item, index) => {
            return (
                <>
                    {item !== 'id' && <Text break key={index} style={{
                        ...styles.headerText,
                        minWidth: (admin ? 580 : 625) / Object.keys(tableData[0]).length,
                        maxWidth: (admin ? 580 : 625) / Object.keys(tableData[0]).length,
                        borderLeftWidth: index === (admin ? 0 : 1) ? 1 : null,
                    }}>
                        {item.replace('_', " ").split('-').join(' ')}
                    </Text>}
                </>
            )})
        let table_body = tableData.length > 0 && tableData.map((items, indexs) => {
            return (
                <View style={styles.section}>
                    {Object.keys(tableData[0]).map((item, index) => (
                        <>
                            {item !== 'id' && <Text break key={index + 10} style={{
                                ...styles.bodyText,
                                minWidth: (admin ? 580 : 625) / Object.keys(tableData[0]).length,
                                maxWidth: (admin ? 580 : 625) / Object.keys(tableData[0]).length,
                                borderLeftWidth: index === (admin ? 0 : 1) ? 1 : null,
                            }}>
                                {items[item] ? typeof items[item] === 'string' ? items[item].split('-').join(' ') : items[item] : 'N/A'}
                            </Text>}
                        </>
                    ))}

                </View>
            )})
        return (
            <div className={'ui-pdf w-100'}>
                <div className="ui-close" onClick={pdfViewr}>
                    <i className="fas fa-times-circle"></i>
                </div>
                <PDFViewer>
                    <Document style={styles.document} >
                        <Page size="A4" style={styles.page} wrap={true}>
                            <View style={styles.sectionTop}>
                                <Image style={{width: 65, marginBottom: 15}} src={process.env.PUBLIC_URL + '/media/image/logo.png'} />
                                <Text style={{...styles.header, marginBottom: 25, color: '#0f5ea8'}}>{reportTitle}</Text>
                            </View>
                            <View style={styles.section}>
                                {table_headers}
                            </View>
                            {table_body}
                        </Page>
                    </Document>
                </PDFViewer>
            </div>
        );
    }
}

export default TablePdfViewer;
