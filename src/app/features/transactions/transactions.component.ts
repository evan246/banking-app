// Trivial change for git commit
// Another trivial change
// A third trivial change
// A fourth trivial change
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TransactionService } from '../../core/services/transaction.service';
import { AuthService } from '../../core/services/auth.service';
import { Transaction, TransactionStatus } from '../../core/models/transaction.model';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzTagModule,
    NzIconModule,
    NzModalModule,
    NzFormModule
  ],
  template: `
    <div class="transactions-container">
      <div class="content-wrap">
        <nz-card nzTitle="Transactions" class="transactions-card">
        <div class="card-header">
          <div class="card-title">Transactions</div>
          <div class="card-actions">
            <button *ngIf="canCreate" nz-button nzType="primary" (click)="showNewTransactionModal()">
              <i nz-icon nzType="plus"></i>
              Add Transaction
            </button>
          </div>
        </div>

        <div class="filters">
          <nz-input-group [nzPrefix]="prefixIconSearch" style="width: 300px;">
            <input
              type="text"
              nz-input
              placeholder="Search transactions..."
              [(ngModel)]="searchText"
              (ngModelChange)="onSearch()" />
          </nz-input-group>
          <ng-template #prefixIconSearch>
            <i nz-icon nzType="search"></i>
          </ng-template>

          <div class="filters-right">
            <nz-select
              [(ngModel)]="filterStatus"
              (ngModelChange)="onFilter()"
              nzPlaceHolder="All Statuses"
              class="filter-select">
              <nz-option nzValue="" nzLabel="All Statuses"></nz-option>
              <nz-option nzValue="completed" nzLabel="Completed"></nz-option>
              <nz-option nzValue="pending" nzLabel="Pending"></nz-option>
              <nz-option nzValue="failed" nzLabel="Failed"></nz-option>
              <nz-option nzValue="cancelled" nzLabel="Cancelled"></nz-option>
            </nz-select>

            <nz-select
              [(ngModel)]="filterType"
              (ngModelChange)="onFilter()"
              nzPlaceHolder="All Types"
              class="filter-select">
              <nz-option nzValue="" nzLabel="All Types"></nz-option>
              <nz-option nzValue="deposit" nzLabel="Deposit"></nz-option>
              <nz-option nzValue="withdrawal" nzLabel="Withdrawal"></nz-option>
              <nz-option nzValue="transfer" nzLabel="Transfer"></nz-option>
              <nz-option nzValue="payment" nzLabel="Payment"></nz-option>
            </nz-select>
          </div>
        </div>

        <nz-table
          #transactionTable
          class="transactions-table"
          [nzData]="filteredTransactions"
          [nzLoading]="loading"
          [nzPageSize]="10"
          [nzScroll]="{ x: '100%' }">
          <thead>
            <tr>
              <th class="col-ref">Ref</th>
              <th class="col-type">Type</th>
              <th class="col-amount">Amount</th>
              <th class="col-currency">Currency</th>
              <th class="col-status">Status</th>
              <th class="col-desc">Description</th>
              <th class="col-date">Date</th>
              <th class="col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let transaction of transactionTable.data">
              <td class="col-ref">{{ transaction.reference_number }}</td>
              <td class="col-type">
                <span class="transaction-type">{{ transaction.transaction_type | uppercase }}</span>
              </td>
              <td class="col-amount">
                <span [class.negative]="transaction.transaction_type === 'withdrawal' || transaction.transaction_type === 'payment'">
                  {{ (transaction.transaction_type === 'withdrawal' || transaction.transaction_type === 'payment') ? '-' : '+' }}$ {{ transaction.amount | number:'1.2-2' }}
                </span>
              </td>
              <td class="col-currency">{{ transaction.currency }}</td>
              <td class="col-status">
                <nz-tag [nzColor]="getStatusColor(transaction.status)">
                  {{ transaction.status | uppercase }}
                </nz-tag>
              </td>
              <td class="col-desc">{{ transaction.description || '-' }}</td>
              <td class="col-date">{{ transaction.created_at | date: 'short' }}</td>
              <td class="col-actions">
                <button nz-button nzType="link" nzSize="small" title="View details" (click)="viewDetails(transaction)">
                  <i nz-icon nzType="eye"></i>
                </button>

                <button *ngIf="canModify" nz-button nzType="link" nzSize="small" title="Edit transaction" (click)="editTransaction(transaction)">
                  <i nz-icon nzType="edit"></i>
                </button>

                <button *ngIf="canModify" nz-button nzType="link" nzSize="small" title="Delete transaction" (click)="confirmDelete(transaction)">
                  <i nz-icon nzType="delete"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </nz-table>
        </nz-card>
      </div>
    </div>

    <nz-modal
      [(nzVisible)]="isModalVisible"
      nzTitle="Transaction Details"
      (nzOnCancel)="handleCancel()"
      [nzFooter]="null">
      <ng-container *nzModalContent>
        <div class="transaction-details" *ngIf="selectedTransaction">
          <div class="detail-row">
            <span class="label">Reference:</span>
            <span class="value">{{ selectedTransaction.reference_number }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Type:</span>
            <span class="value">{{ selectedTransaction.transaction_type | uppercase }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Amount:</span>
            <span class="value">$ {{ selectedTransaction.amount | number:'1.2-2' }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Status:</span>
            <nz-tag [nzColor]="getStatusColor(selectedTransaction.status)">
              {{ selectedTransaction.status | uppercase }}
            </nz-tag>
          </div>
          <div class="detail-row" *ngIf="selectedTransaction.description">
            <span class="label">Description:</span>
            <span class="value">{{ selectedTransaction.description }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Date:</span>
            <span class="value">{{ selectedTransaction.created_at | date: 'medium' }}</span>
          </div>
        </div>
      </ng-container>
    </nz-modal>

    <!-- New Transaction Modal -->
    <nz-modal
      [(nzVisible)]="isCreateModalVisible"
      nzTitle="New Transaction"
      (nzOnCancel)="handleCreateCancel()"
      nzOkText="Create"
      (nzOnOk)="submitNewTransaction()">
      <ng-container *nzModalContent>
        <form nz-form>
          <nz-form-item>
            <nz-form-label [nzSpan]="6">Type</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <nz-select [(ngModel)]="newTransaction.transaction_type" name="transaction_type">
                <nz-option nzValue="deposit" nzLabel="Deposit"></nz-option>
                <nz-option nzValue="withdrawal" nzLabel="Withdrawal"></nz-option>
                <nz-option nzValue="transfer" nzLabel="Transfer"></nz-option>
                <nz-option nzValue="payment" nzLabel="Payment"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">Amount</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input type="number" [(ngModel)]="newTransaction.amount" name="amount" />
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">Currency</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <nz-select [(ngModel)]="newTransaction.currency" name="currency">
                <nz-option nzValue="USD" nzLabel="USD"></nz-option>
                <nz-option nzValue="EUR" nzLabel="EUR"></nz-option>
              </nz-select>
            </nz-form-control>
          </nz-form-item>

          <nz-form-item>
            <nz-form-label [nzSpan]="6">Description</nz-form-label>
            <nz-form-control [nzSpan]="18">
              <input nz-input type="text" [(ngModel)]="newTransaction.description" name="description" />
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
  `,
  styles: [`
    .transactions-container {
      padding: 18px 0; /* vertical breathing space */
      background: var(--light-gray);
    }

    .content-wrap {
      max-width: 1180px;
      margin: 0 auto;
      padding: 20px; /* left/right padding so content doesn't touch edge */
    }

    .transactions-card {
      border-radius: 8px;
      overflow: hidden;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 20px;
      background-color: var(--primary-navy);
      color: var(--white);
    }

    .card-title {
      font-size: 18px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }

    .card-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .filters {
      display: flex;
      gap: 16px;
      margin: 18px 0;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .filters-right {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    ::ng-deep .ant-card-head {
      display: none; /* we use our own header for consistent layout */
    }

    .transaction-type {
      font-weight: 600;
      text-transform: capitalize;
    }

    .negative {
      color: var(--error);
      font-weight: 600;
    }

    .transaction-details {
      padding: 16px 0;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid var(--medium-gray);
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: var(--primary-navy);
    }

    .value {
      color: var(--dark-gray);
    }

    /* Transactions table tweaks */
    .transactions-table {
      width: 100%;
      border-radius: 6px;
      background: #fff;
      table-layout: fixed; /* ensure header cells align with body using fixed column widths */
    }

    .transactions-table thead th {
      background: var(--primary-navy);
      color: #fff;
      font-weight: 700;
      padding: 18px 12px; /* match tbody cell vertical padding */
      text-align: left;
      vertical-align: middle;
      white-space: nowrap; /* prevent header titles from wrapping */
      overflow: hidden;
      text-overflow: ellipsis; /* gracefully truncate long titles */
    }

    /* Stronger global-safe rule to prevent header wrapping imposed by other styles */
    :host ::ng-deep .ant-table-thead > tr > th {
      white-space: nowrap !important;
    }

    .transactions-table td {
      padding: 18px 12px;
      vertical-align: middle;
    }

    /* Column width guidance (percentages tuned for balance) */
    .transactions-table th.col-ref,
    .transactions-table td.col-ref { width: 12%; }

    .transactions-table th.col-type,
    .transactions-table td.col-type { width: 12%; text-transform: capitalize; }

    .transactions-table th.col-amount,
    .transactions-table td.col-amount { width: 14%; text-align: right; }

    .transactions-table th.col-currency,
    .transactions-table td.col-currency { width: 9%; text-align: center; }

    /* Ensure the Currency header stays centered and on one line like other headers */
    .transactions-table thead th.col-currency {
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
    }

    .transactions-table th.col-status,
    .transactions-table td.col-status { width: 12%; text-align: center; }

    /* Keep header white but body description text darker for readability */
    .transactions-table th.col-desc { width: 23%; }
    .transactions-table td.col-desc { width: 23%; color: var(--dark-gray); }

    .transactions-table th.col-date,
    .transactions-table td.col-date { width: 12%; }

    .transactions-table th.col-actions,
    .transactions-table td.col-actions { width: 6%; text-align: center; }

    /* Ensure the Actions header stays horizontal and aligned with cells */
    .transactions-table thead th.col-actions {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      writing-mode: horizontal-tb; /* override any accidental vertical writing-mode */
      transform: none; /* ensure no rotation */
      text-align: center;
      vertical-align: middle;
    }

    /* Stronger overrides in case a global stylesheet or library forces vertical text */
    :host ::ng-deep .transactions-table thead th.col-actions,
    :host ::ng-deep .transactions-table thead th.col-currency {
      writing-mode: horizontal-tb !important;
      transform: none !important;
      white-space: nowrap !important;
      display: table-cell !important;
      text-orientation: mixed !important;
      line-height: 1.2 !important;
      letter-spacing: normal !important;
      word-break: normal !important;
      text-align: center !important;
      vertical-align: middle !important;
    }

    .transaction-type {
      font-weight: 600;
    }

    .transactions-table .negative {
      color: var(--accent-orange);
      font-weight: 700;
    }

    /* Responsive tweaks */
    @media (max-width: 900px) {
      .content-wrap { padding: 12px; }
      .transactions-table thead th, .transactions-table td { padding: 10px 8px; }
      .filters { gap: 8px; }
      .filters-right { flex-direction: row; gap: 8px; }
      .transactions-table th.col-desc, .transactions-table td.col-desc { display: none; }
    }
  `]
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  loading = false;
  searchText = '';
  filterStatus = '';
  filterType = '';
  isModalVisible = false;
  isCreateModalVisible = false;
  newTransaction: Partial<Transaction> = { transaction_type: 'deposit', amount: 0, currency: 'USD', description: '' };
  selectedTransaction: Transaction | null = null;

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.loading = true;
    const user = this.authService.currentUserValue;
    const userId = user?.role === 'customer' ? user.id : undefined;

    this.transactionService.getTransactions(userId).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.filteredTransactions = transactions;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.transactions = this.getMockTransactions();
        this.filteredTransactions = this.transactions;
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.applyFilters();
  }

  onFilter(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesSearch = !this.searchText ||
        transaction.reference_number.toLowerCase().includes(this.searchText.toLowerCase()) ||
        transaction.description?.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesStatus = !this.filterStatus || transaction.status === this.filterStatus;
      const matchesType = !this.filterType || transaction.transaction_type === this.filterType;

      return matchesSearch && matchesStatus && matchesType;
    });
  }

  get canCreate(): boolean {
    return this.authService.hasRole(['admin', 'manager']);
  }

  get canModify(): boolean {
    return this.authService.hasRole(['admin', 'manager']);
  }

  editTransaction(transaction: Transaction): void {
    console.log('Edit transaction', transaction);
    // TODO: open edit modal or route to edit page
  }

  showNewTransactionModal(): void {
    this.isCreateModalVisible = true;
  }

  handleCreateCancel(): void {
    this.isCreateModalVisible = false;
    this.newTransaction = { transaction_type: 'deposit', amount: 0, currency: 'USD', description: '' };
  }

  submitNewTransaction(): void {
    const user = this.authService.currentUserValue;
    const payload: Partial<Transaction> = {
      transaction_type: this.newTransaction.transaction_type,
      amount: Number(this.newTransaction.amount) || 0,
      currency: this.newTransaction.currency || 'USD',
      description: this.newTransaction.description || undefined,
      user_id: user?.id || 'unknown',
      status: 'pending'
    };

    this.transactionService.createTransaction(payload).subscribe({
      next: (created) => {
        // prepend to lists so newest shows first
        this.transactions = [created, ...this.transactions];
        this.applyFilters();
        this.isCreateModalVisible = false;
        this.newTransaction = { transaction_type: 'deposit', amount: 0, currency: 'USD', description: '' };
      },
      error: (err) => {
        console.error('Create transaction failed, falling back to local mock:', err);
        // Fallback: create a local mock item so UI reflects the new transaction
        const mock: Transaction = {
          id: `local-${Date.now()}`,
          user_id: user?.id || 'local-user',
          transaction_type: payload.transaction_type as any,
          amount: payload.amount || 0,
          currency: payload.currency || 'USD',
          status: 'pending',
          description: payload.description || `Manual transaction`,
          reference_number: `TXN${String(Math.floor(Math.random() * 1000000)).padStart(6, '0')}`,
          created_at: new Date().toISOString()
        };

        this.transactions = [mock, ...this.transactions];
        this.applyFilters();
        this.isCreateModalVisible = false;
        this.newTransaction = { transaction_type: 'deposit', amount: 0, currency: 'USD', description: '' };
      }
    });
  }

  confirmDelete(transaction: Transaction): void {
    // Simple confirmation — replace with NzModal.confirm if desired
    if (confirm(`Delete transaction ${transaction.reference_number}?`)) {
      this.deleteTransaction(transaction.id);
    }
  }

  deleteTransaction(id: string): void {
    console.log('Delete transaction', id);
    // TODO: call service to delete and refresh list
  }

  viewDetails(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.isModalVisible = true;
  }

  handleCancel(): void {
    this.isModalVisible = false;
    this.selectedTransaction = null;
  }

  // showNewTransactionModal(): void {
  //   console.log('New transaction modal');
  // }

  getStatusColor(status: string): string {
    const colors: { [key: string]: string } = {
      'completed': 'success',
      'pending': 'warning',
      'failed': 'error',
      'cancelled': 'default'
    };
    return colors[status] || 'default';
  }

  getMockTransactions(): Transaction[] {
    const types = ['deposit', 'withdrawal', 'transfer', 'payment'];
    const statuses: TransactionStatus[] = ['completed', 'pending', 'failed'];
    const demoNames = [
      'Amaka Okoro', 'Somy Nwafor', 'Amanda Eze', 'Kamsi Obi', 'Naeto Chukwu', 'Zikora Ude', 'Ada Nwane', 'Diogo Ife', 'Dimma Uzo'
    ];

    const transactions: Transaction[] = [];

    for (let i = 0; i < 25; i++) {
      const name = demoNames[i % demoNames.length];
      transactions.push({
        id: `${i + 1}`,
        user_id: name,
        transaction_type: types[Math.floor(Math.random() * types.length)] as any,
        amount: Math.floor(Math.random() * 10000) + 100,
        currency: 'USD',
        status: statuses[Math.floor(Math.random() * statuses.length)],
        description: `Transaction ${i + 1}`,
        reference_number: `TXN${String(i + 1).padStart(6, '0')}`,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    return transactions;
  }
}
