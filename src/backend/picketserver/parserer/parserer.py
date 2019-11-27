from urllib.request import urlopen
from bs4 import BeautifulSoup
from .models import Item

class Parserer:

	def __init__(self, _url):
		self.m_url = _url
		self.m_domain = None
		self.m_tags = {'item_domain':'', 'name_tag':'', 'price_tag':'', 'image_tag':''}
	
	def openUrl(self):
		_html = urlopen(self.m_url)
		_bs = BeautifulSoup(_html, 'html.parser')
		return _bs
	
	def parseDomain(self):
		_list = self.m_url.split('.')

		try:
			_index = _list.index('co') - 1
			self.m_domain = _list[_index]
			return
		except:
			pass

		try:
			_index = _list.index('com') - 1
			self.m_domain = _list[_index]
			return
		except:
			pass

	def parseItem(self):
		_bs = self.openUrl()

		# get Item Name
		_name = _bs.find(class_ = self.m_tags['name_tag']).get_text()

		# get Item price
		_price = _bs.find(class_ = self.m_tags['price_tag']).get_text()

		# get Item Image
		_img = _bs.select(self.m_tags['image_tag'])
		_img = _img[0].get('src')

		return {'domain_name':self.m_tags['item_domain'], 'item_url':self.m_url, 'item_name':_name, 'item_price':_price, 'item_image':_img}

	def parseReview(self):
		_bs = self.openUrl()
		pass

	def recvTags(self):
		try:
			item = Item.objects.get(domain_name = self.m_domain)
			self.m_tags['item_domain'] = item.item_domain
			self.m_tags['name_tag'] = item.item_name
			self.m_tags['price_tag'] = item.item_price
			self.m_tags['image_tag'] = item.item_image
		except:
			return {'status':'fail', 'message':"This shopping mall site is not supported"}

	def setUrl(self,_url):
		self.m_url = _url
	
	def setTags(self, _tags):
		self.m_tags = _tags

	def getUrl(self):
		return self.m_url
	
	def getTags(self):
		return self.m_tags