import { Injectable } from '@angular/core';

export interface PasswordData {
  group: string;
  name: string;
  url: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  exportToCSV(groups: any[], filename: string = 'passwords'): void {
    const csvData = this.convertToCSV(groups);
    this.downloadCSV(csvData, filename);
  }

  private convertToCSV(groups: any[]): string {
    const headers = ['Group', 'Name', 'URL', 'Password'];
    let csvContent = headers.join(',') + '\n';

    groups.forEach(group => {
      group.passwords.forEach((password: any) => {
        const row = [
          this.escapeCSVField(group.name),
          this.escapeCSVField(password.name),
          this.escapeCSVField(password.url),
          this.escapeCSVField(password.password)
        ];
        csvContent += row.join(',') + '\n';
      });
    });

    return csvContent;
  }

  private escapeCSVField(field: string): string {
    if (!field) return '""';
    const fieldStr = String(field);
    if (fieldStr.includes(',') || fieldStr.includes('"') || fieldStr.includes('\n')) {
      return '"' + fieldStr.replace(/"/g, '""') + '"';
    }
    return fieldStr;
  }

  private downloadCSV(csvContent: string, filename: string): void {
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }

  importFromCSV(file: File): Promise<PasswordData[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string;
          const data = this.parseCSV(csv);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      };
      
      reader.onerror = () => reject(new Error('File reading failed'));
      reader.readAsText(file, 'UTF-8');
    });
  }

  private parseCSV(csv: string): PasswordData[] {
    const lines = csv.split('\n');
    const result: PasswordData[] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const fields = this.parseCSVLine(line);
        if (fields.length >= 4) {
          result.push({
            group: fields[0] || '',
            name: fields[1] || '',
            url: fields[2] || '',
            password: fields[3] || ''
          });
        }
      }
    }
    
    return result;
  }

  private parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
        
          current += '"';
          i += 2;
        } else {
         
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === ',' && !inQuotes) {
     
        result.push(current);
        current = '';
        i++;
      } else {
        current += char;
        i++;
      }
    }

   
    result.push(current);
    
    return result;
  }

  validateCSVStructure(data: PasswordData[]): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (data.length === 0) {
      errors.push('CSV file is empty');
      return { isValid: false, errors };
    }

    data.forEach((item, index) => {
      if (!item.group) {
        errors.push(`Row ${index + 2}: Group name is required`);
      }
      if (!item.name) {
        errors.push(`Row ${index + 2}: Password name is required`);
      }
      if (!item.password) {
        errors.push(`Row ${index + 2}: Password is required`);
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  mergeImportedData(existingGroups: any[], importedData: PasswordData[]): any[] {
    const groupMap = new Map<string, any>();

    existingGroups.forEach(group => {
      groupMap.set(group.name, { ...group, passwords: [...group.passwords] });
    });

    importedData.forEach(item => {
      if (!groupMap.has(item.group)) {
        groupMap.set(item.group, {
          name: item.group,
          passwords: []
        });
      }
      
      const group = groupMap.get(item.group);
      group!.passwords.push({
        name: item.name,
        url: item.url,
        password: item.password,
        show: false
      });
    });
    
    return Array.from(groupMap.values());
  }
}
