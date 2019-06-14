class Listing
  attr_accessor :sold # boolean
  
  def purchasable?
    !sold
  end
end

######################################################################################

class Listing
  attr_accessor :sold # boolean
  attr_accessor :published # boolean
  
  def purchasable?
    !sold && published
  end
end
