from transformers import TFGPT2LMHeadModel, GPT2Tokenizer
import os
import tensorflow as tf


if __name__ == "__main__":
    # Hide GPU from visible devices
    tf.config.set_visible_devices([], 'GPU')
    
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    # add the EOS token as PAD token to avoid warnings
    model = TFGPT2LMHeadModel.from_pretrained("gpt2", pad_token_id=tokenizer.eos_token_id)
    model.save("./test_gpt2")
