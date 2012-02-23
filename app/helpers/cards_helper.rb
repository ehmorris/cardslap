module CardsHelper
  def is_string_image? str
    # make sure string has no white space
    if !str.match(/\s/)
      uri = URI.parse(str)
      # if the string is a url, assume it's an image
      return %w(http https).include?(uri.scheme)
    else
      return false
    end
  end
end
