
#In the last section, we realized that we were executing five times more updates
#(the train_step function) per epoch due to the mini-batch inner loop. Before, 1,000
#epochs meant 1,000 updates. Now, we only need 200 epochs to perform the same
#1,000 updates
# Defines number of epochs
n_epochs = 200 

losses = []

for epoch in range(n_epochs):
    # inner loop
    loss = mini_batch(device, train_loader, train_step)
    losses.append(loss)
