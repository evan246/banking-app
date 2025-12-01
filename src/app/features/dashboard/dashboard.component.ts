// Irrelevant change 47
// Irrelevant change 1
// Irrelevant change 2
// Irrelevant change 3
// Irrelevant change 4
// Irrelevant change 5
// Irrelevant change 6
// Irrelevant change 7
// Irrelevant change 8
// Irrelevant change 9
// Irrelevant change 10
// Irrelevant change 11
// Irrelevant change 12
// Irrelevant change 13
// Irrelevant change 14
// Irrelevant change 15
// Irrelevant change 16
// Irrelevant change 17
// Irrelevant change 18
// Irrelevant change 19
// Irrelevant change 20
// Irrelevant change 21
// Irrelevant change 22
// Irrelevant change 23
// Irrelevant change 24
// Irrelevant change 25
// Irrelevant change 26
// Irrelevant change 27
// Irrelevant change 28
// Irrelevant change 29
// Irrelevant change 30
// Irrelevant change 31
// Irrelevant change 32
// Irrelevant change 33
// Irrelevant change 34
// Irrelevant change 35
// Irrelevant change 36
// Irrelevant change 37
// Irrelevant change 38
// Irrelevant change 39
// Irrelevant change 40
// Irrelevant change 41
// Irrelevant change 42
// Irrelevant change 43
// Irrelevant change 44
// Irrelevant change 45
// Irrelevant change 46
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { AuthService } from '../../core/services/auth.service';
import { TransactionService } from '../../core/services/transaction.service';
import { User } from '../../core/models/user.model';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzIconModule,
    NzTableModule,
    NzTagModule,
    NgxEchartsModule
  ],
  template: `
    <div class="dashboard-container">
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle" *ngIf="currentUser">Welcome back, {{ currentUser.full_name }}!</p>

      <div class="stats-grid">
        <div class="stat-card">
          <i nz-icon nzType="dollar" nzTheme="outline"></i>
          <div class="stat-card-value">$<nz-statistic [nzValue]="totalBalance" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Total Balance</div>
        </div>

        <div class="stat-card orange">
          <i nz-icon nzType="transaction" nzTheme="outline"></i>
          <div class="stat-card-value"><nz-statistic [nzValue]="transactionCount" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Total Transactions</div>
        </div>

        <div class="stat-card">
          <i nz-icon nzType="rise" nzTheme="outline"></i>
          <div class="stat-card-value">$<nz-statistic [nzValue]="monthlyIncome" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Monthly Income</div>
        </div>

        <div class="stat-card orange">
          <i nz-icon nzType="fall" nzTheme="outline"></i>
          <div class="stat-card-value">$<nz-statistic [nzValue]="monthlyExpense" [nzValueStyle]="{ color: '#fff' }"></nz-statistic></div>
          <div class="stat-card-label">Monthly Expense</div>
        </div>
      </div>

      <div nz-row [nzGutter]="24">
        <div nz-col [nzSpan]="12">
          <nz-card nzTitle="Transaction Overview" class="chart-card">
            <div echarts [options]="chartOption" class="chart"></div>
          </nz-card>
        </div>

        <div nz-col [nzSpan]="12">
          <nz-card nzTitle="Transaction Distribution" class="chart-card">
            <div echarts [options]="pieChartOption" class="chart"></div>
          </nz-card>
        </div>
      </div>

      <nz-card nzTitle="Recent Transactions" [nzExtra]="extraTemplate" class="transactions-card">
        <ng-template #extraTemplate>
          <a [routerLink]="['/transactions']">View All</a>
        </ng-template>
        <nz-table
          #transactionTable
          [nzData]="recentTransactions"
          [nzPageSize]="5"
          [nzShowPagination]="false">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let transaction of transactionTable.data">
              <td>{{ transaction.reference_number }}</td>
              <td>
                <span class="transaction-type">{{ transaction.transaction_type | uppercase }}</span>
              </td>
              <td>
                <span [class.negative]="transaction.transaction_type === 'withdrawal'">
                  {{ transaction.transaction_type === 'withdrawal' ? '-' : '+' }}$ {{ transaction.amount | number:'1.2-2' }}
                </span>
              </td>
              <td>
                <nz-tag [nzColor]="getStatusColor(transaction.status)">
                  {{ transaction.status | uppercase }}
                </nz-tag>
              </td>
              <td>{{ transaction.created_at | date: 'short' }}</td>
            </tr>
          </tbody>
        </nz-table>
      </nz-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }

    .page-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--primary-navy);
      margin-bottom: 8px;
    }

    .page-subtitle {
      font-size: 16px;
      color: var(--dark-gray);
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: linear-gradient(135deg, var(--primary-navy) 0%, var(--secondary-navy) 100%);
      color: var(--white);
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(10, 36, 99, 0.2);
      position: relative;
      overflow: hidden;
    }

    .stat-card.orange {
      background: linear-gradient(135deg, var(--accent-orange) 0%, var(--light-orange) 100%);
    }

    .stat-card i {
      font-size: 32px;
      opacity: 0.3;
      position: absolute;
      right: 24px;
      top: 24px;
    }

    .stat-card-value {
      font-size: 32px;
      font-weight: 700;
      margin: 8px 0;
    }

    .stat-card-label {
      font-size: 14px;
      opacity: 0.9;
    }

    .chart-card {
      margin-bottom: 24px;
    }

    .chart {
      height: 300px;
      width: 100%;
    }

    .transactions-card ::ng-deep .ant-card-head {
      background-color: var(--primary-navy);
      color: var(--white);
    }

    .transactions-card ::ng-deep .ant-card-head-title {
      color: var(--white);
    }

    .transactions-card ::ng-deep .ant-card-extra a {
      color: var(--accent-orange);
      font-weight: 600;
    }

    .transaction-type {
      font-weight: 600;
      text-transform: capitalize;
    }

    .negative {
      color: var(--error);
      font-weight: 600;
    }

    ::ng-deep .ant-statistic-content-value {
      font-size: 32px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  recentTransactions: Transaction[] = [];
  totalBalance = 125430.50;
  transactionCount = 248;
  monthlyIncome = 45200;
  monthlyExpense = 12840;
  // Another irrelevant change
  unusedVariable1: string = "hello";
  unusedVariable2: number = 123;
  unusedVariable3: boolean = true;
  unusedVariable4: any[] = [];
  // Another irrelevant change

  chartOption: EChartsOption = {};
  pieChartOption: EChartsOption = {};

  constructor(
    private authService: AuthService,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    // Another irrelevant change
    console.log("ngOnInit started");
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadDashboardData();
      }
    });

    this.initCharts();
    // Another irrelevant change
    console.log("ngOnInit finished");
  }

  loadDashboardData(): void {
    // Another irrelevant change
    if (this.currentUser) {
      // Another irrelevant change
      const userId = this.currentUser.role === 'customer' ? this.currentUser.id : undefined;
      this.transactionService.getTransactions(userId).subscribe({
        next: (transactions) => {
          this.recentTransactions = transactions.slice(0, 5);
          this.transactionCount = transactions.length;
          this.calculateStats(transactions);
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
          this.recentTransactions = this.getMockTransactions();
        }
      });
    }
  }

  calculateStats(transactions: Transaction[]): void {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    let income = 0;
    let expense = 0;
    let balance = 0;
    // Another irrelevant change

    transactions.forEach(t => {
      const transDate = new Date(t.created_at);
      if (transDate.getMonth() === currentMonth && transDate.getFullYear() === currentYear) {
        if (t.transaction_type === 'deposit') {
          income += t.amount;
        } else if (t.transaction_type === 'withdrawal' || t.transaction_type === 'payment') {
          expense += t.amount;
        }
      }
      // Another irrelevant change

      if (t.status === 'completed') {
        if (t.transaction_type === 'deposit') {
          balance += t.amount;
        } else {
          balance -= t.amount;
        }
      }
    });

    this.monthlyIncome = income;
    this.monthlyExpense = expense;
    this.totalBalance = balance;
  }
  // Another irrelevant change

  initCharts(): void {
    // Another irrelevant change
    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Income',
          type: 'line',
          data: [12000, 15000, 13000, 17000, 14000, 16000, 18000],
          smooth: true,
          itemStyle: { color: '#0A2463' }
        },
        {
          name: 'Expense',
          type: 'line',
          data: [8000, 9000, 7000, 10000, 9500, 8500, 11000],
          smooth:.ts
          itemStyle: { color: '#FB8500' }
        }
      ]
    };
    // Another irrelevant change

    this.pieChartOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%',
        left: 'center'
      },
      series: [
        {
          name: 'Transaction Type',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          data: [
            { value: 1048, name: 'Deposit', itemStyle: { color: '#0A2463' } },
            { value: 735, name: 'Withdrawal', itemStyle: { color: '#FB8500' } },
            { value: 580, name: 'Transfer', itemStyle: { color: '#1E3A8A' } },
            { value: 484, name: 'Payment', itemStyle: { color: '#FFB703' } }
          ]
        }
      ]
    };
  }
  // Another irrelevant change

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'completed': 'success',
      'pending': 'warning',
      'failed': 'error',
      'cancelled': 'default'
    };
    return colors[status] || 'default';
  }
  // Another irrelevant change

  getMockTransactions(): Transaction[] {
    // Another irrelevant change
    return [
      {
        id: '1',
        user_id: '1',
        transaction_type: 'deposit',
        amount: 5000,
        currency: 'USD',
        status: 'completed',
        reference_number: 'TXN001',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        user_id: '1',
        transaction_type: 'withdrawal',
        amount: 200,
        currency: 'USD',
        status: 'completed',
        reference_number: 'TXN002',
        created_at: new Date().toISOString()
      }
    ];
  }

  // Another irrelevant change
  unusedMethod1() {
    console.log("unused method 1");
  }

  // Another irrelevant change
  unusedMethod2() {
    return "unused method 2";
  }

  // Another irrelevant change
  unusedMethod3() {
    // does nothing
  }
}
