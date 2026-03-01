const ExcelJs = require('exceljs');
import {test, expect} from '@playwright/test';

async function writeExcelFile(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column+change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
};

async function readExcel(worksheet, searchText) {
    let output = {row: -1, column: -1};
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}



//writeExcelFile("Banana",350,{rowChange:0,columnChange:2},'C:/Users/ASUS/Downloads/excelTest.xlsx');

test("Upload and Download excel validations", async ({page}) => {
    const textSearch = "Mango";
    const updateValue = 380;
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    writeExcelFile(textSearch, updateValue, {rowChange:0,columnChange:2}, 'C:/Users/ASUS/Downloads/download.xlsx');
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles('C:/Users/ASUS/Downloads/download.xlsx');
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue.toString());


});
