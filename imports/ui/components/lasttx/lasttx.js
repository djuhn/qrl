import { lasttx } from '/imports/api/index.js'
import './lasttx.html'
import { numberToString, SHOR_PER_QUANTA } from '../../../startup/both/index.js'

Template.lasttx.onCreated(() => {
  Meteor.subscribe('lasttx')
})

Template.lasttx.helpers({
  lasttx() {
    const res = lasttx.findOne()
    return res
  },
  amount() {
    if (this.tx.transfer) {
      return this.explorer.totalTransferred
    }
    if (this.tx.transfer_token) {
      return this.explorer.totalTransferred
    }
    return ''
  },
  block() {
    return this.header.block_number
  },
  ts() {
    if (this.header) {
      const x = moment.unix(this.header.timestamp_seconds)
      return moment(x).format('HH:mm D MMM YYYY')
    }
    const x = moment.unix(this.timestamp_seconds)
    return moment(x).format('HH:mm D MMM YYYY')
  },
  zeroCheck() {
    let ret = false
    const x = lasttx.findOne()
    if (x) { if (x.length === 0) { ret = true } }
    if (x === undefined) { ret = true }
    return ret
  },
  isTransfer(txType) {
    if (txType === 'transfer') {
      return true
    }
    return false
  },
  isTokenCreation(txType) {
    if (txType === 'token') {
      return true
    }
    return false
  },
  isTokenTransfer(txType) {
    if (txType === 'transfer_token') {
      return true
    }
    return false
  },
  isCoinbaseTxn(txType) {
    if (txType === 'coinbase') {
      return true
    }
    return false
  },
  isSlaveTxn(txType) {
    if (txType === 'slave') {
      return true
    }
    return false
  },
  isLatticePKTxn(txType) {
    if (txType === 'latticePK') {
      return true
    }
    return false
  },
  isMessageTxn(txType) {
    if (txType === 'MESSAGE') {
      return true
    }
    return false
  },
  isDocumentNotarisation(txType) {
    if (txType === 'DOCUMENT_NOTARISATION') {
      return true
    }
    return false
  },
  isConfirmed(confirmed) {
    if (confirmed === 'true') {
      return true
    }
    return false
  },
})

Template.lasttx.events({
  'click .transactionRecord': (event) => {
    const route = event.currentTarget.childNodes[5].childNodes[1].attributes[0].nodeValue
    FlowRouter.go(route)
  },
})

